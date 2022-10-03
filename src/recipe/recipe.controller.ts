import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { UpdatedescriptionDto } from './dto/update-description.dto';
import { RecipeService } from './recipe.service';

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

  @Post()
  async createRecipe(@Body() recipeDto: RecipeDto) {
    return await this.recipeService.createRecipe(recipeDto);
  }

  @Patch('/:id')
  async updateDescription(
    @Body() { description }: UpdatedescriptionDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.recipeService.updateDescription(id, description);
  }

  @Delete('/:id')
  async deleteRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.recipeService.deleteRecipe(id);
  }
}
