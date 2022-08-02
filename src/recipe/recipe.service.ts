import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { Recipe } from './entity/recipe';
import { v4 } from 'uuid';

@Injectable()
export class RecipeService {

    private _recipes: Recipe[] = [];

    async getRecipes(): Promise<Recipe[]> {
        return this._recipes;
    }

    async getRecipe(id: string): Promise<Recipe> {
        const recipe = this._recipes.find(r => r.id === id);
        if (!recipe) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return recipe;
    }

    async createRecipe(recipe: RecipeDto): Promise<void> {
        const recipeEntity = { ...recipe, id: v4() };
        this._recipes.push(recipeEntity);
    }

    async updateDescription(id: string, description: string): Promise<void> {
        const recipeIndex = this._recipes.findIndex(r => r.id === id);
        if (recipeIndex < 0) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        this._recipes[recipeIndex] = { ...this._recipes[recipeIndex], description };
    }

    async deleteRecipe(id: string): Promise<void> {
        this._recipes = this._recipes.filter(r => r.id !== id);
    }
}
