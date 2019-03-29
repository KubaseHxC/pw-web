import { IngredientVM } from '../../../domain/models';

const checkSelection = (
    ingredients: IngredientVM[],
    selectedIngredient: IngredientVM,
    action: 'add' | 'pop' | 'single'
): IngredientVM[] => {
    const existsOnPizza = isOnPizza(selectedIngredient, ingredients);
    switch (action) {
        case 'add': {
            if (existsOnPizza) {
                if (existsOnPizza.quantity < selectedIngredient.multiplicity) {
                    return ingredients.map(i => {
                        if (i.id === selectedIngredient.id) {
                            return { ...i, quantity: i.quantity + 1 };
                        }
                        return i;
                    });
                }
            } else {
                return ingredients.concat([
                    { ...selectedIngredient, quantity: 1 }
                ]);
            }
            break;
        }
        case 'pop': {
            if (existsOnPizza) {
                if (existsOnPizza.quantity > 1) {
                    return ingredients.map(i => {
                        if (i.id === selectedIngredient.id) {
                            return { ...i, quantity: i.quantity - 1 };
                        }
                        return i;
                    });
                } else {
                    return ingredients.filter(i => i.id !== existsOnPizza.id);
                }
            }
            break;
        }
        case 'single': {
            if (existsOnPizza) {
                return ingredients.filter(i => i.id !== selectedIngredient.id);
            } else {
                if (selectedIngredient.type === 'dough') {
                    return ingredients
                        .filter(
                            i =>
                                i.type === 'simple' ||
                                i.id === selectedIngredient.id
                        )
                        .concat([selectedIngredient]);
                }
                return ingredients.concat([selectedIngredient]);
            }
        }
    }
    return ingredients;
};

const updateIngredientsSelection = (
    listIngredients: IngredientVM[],
    selectedIngredients: IngredientVM[]
): IngredientVM[] => {
    return listIngredients.map(ingredient => {
        const pizzaIngredient = isOnPizza(ingredient, selectedIngredients);
        if (pizzaIngredient) {
            if (ingredient.multiplicity && ingredient.multiplicity > 1) {
                return { ...ingredient, quantity: pizzaIngredient.quantity };
            } else {
                return { ...ingredient, selected: true };
            }
        } else {
            return { ...ingredient, selected: false, quantity: 0 };
        }
    });
};

const isOnPizza = (
    ingredient: IngredientVM,
    pizzaIngredients: IngredientVM[]
): IngredientVM | undefined => {
    return pizzaIngredients.find(i => i.id === ingredient.id);
};

export { checkSelection, updateIngredientsSelection };
