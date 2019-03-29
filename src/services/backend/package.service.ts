import { IngredientVM, PizzaVM } from '../../domain/models';

const calculate = async (pizza: PizzaVM): Promise<number> => {
    return await fetch('https://pizza-builder-api-git-add-now.kubasehxc.now.sh', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country: pizza.location.countryId,
            province: pizza.location.provinceId,
            ingredients: pluckIngredients(pizza.selectedIngredients)
        })
    }).then(res => res.text().then(amount => Number(amount)));
};

const pluckIngredients = (
    ingredients: IngredientVM[]
): { quantity: number; id: number }[] => {
    return ingredients.map(ingredient => {
        if (ingredient.quantity <= 0 || ingredient.selected) {
            return { id: ingredient.id, quantity: 1 };
        } else {
            return { id: ingredient.id, quantity: ingredient.quantity };
        }
    });
};

export { calculate };
