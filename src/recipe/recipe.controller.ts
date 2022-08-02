import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { UpdatedescriptionDto } from './dto/update-description.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {

    constructor(private recipeService: RecipeService) { }

    @Get()
    async getRecipes() {
        return await this.recipeService.getRecipes();
    }

    @Get('/:id')
    async getRecipe(@Param('id') id: string) {
        return await this.recipeService.getRecipe(id);
    }

    @Post()
    async createRecipe(@Body() recipeDto: RecipeDto) {
        return await this.recipeService.createRecipe(recipeDto);
    }

    @Patch('/:id')
    async updateDescription(@Body() { description }: UpdatedescriptionDto, @Param('id') id: string) {
        return await this.recipeService.updateDescription(id, description);
    }

    @Delete('/:id')
    async deleteRecipe(@Param('id') id: string) {
        return await this.recipeService.deleteRecipe(id);
    }
}
