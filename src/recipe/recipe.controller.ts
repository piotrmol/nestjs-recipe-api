import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { Role } from 'src/auth/decorators/role';
import { UserRole } from 'src/auth/entity/user';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoleGuard } from 'src/auth/guard/authorization.guard';
import { HttpExceptionFilter } from 'src/global-filters/http-exception.filter';
import { RecipeDto } from './dto/recipe.dto';
import { UpdatedescriptionDto } from './dto/update-description.dto';
import { RecipeService } from './recipe.service';

@UseFilters(HttpExceptionFilter)
@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  async getRecipes() {
    return await this.recipeService.getRecipes();
  }

  @Get('/:id')
  async getRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.recipeService.getRecipe(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createRecipe(@Body() recipeDto: RecipeDto, @Request() req) {
    const { sub } = req.user;
    return await this.recipeService.createRecipe(recipeDto, sub);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  async updateDescription(
    @Body() { description }: UpdatedescriptionDto,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ) {
    const { sub } = req.user;
    return await this.recipeService.updateDescription(id, description, sub);
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  async deleteRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.recipeService.deleteRecipe(id);
  }
}
