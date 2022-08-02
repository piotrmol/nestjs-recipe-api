import { Unit } from "../dto/recipe.dto";

export class Recipe {
    id: string;
    description: string;
    ingredients: Igredient[];
}

export class Igredient {
    name: string;
    unit: Unit;
    quantity: number;
}