import { IngredientVM } from './ingredient.vmodel';

export class PizzaVM {
    location: {
        countryId: number;
        provinceId: number;
    } = {
        countryId: 1,
        provinceId: 1
    };
    selectedIngredients: IngredientVM[] = []
}