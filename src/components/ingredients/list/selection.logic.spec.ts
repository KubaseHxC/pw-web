import { IngredientVM } from '../../../domain/models';
import { checkSelection, updateIngredientsSelection } from './selection.logic';

it('Should add simple ingredient', () => {
    const selectedIngredient: IngredientVM = {
        description: 'test',
        id: 1,
        multiplicity: 2,
        name: 'test',
        quantity: 0,
        type: 'simple',
        selected: false,
        price: 0
    };
    const pizzaIngredients = checkSelection([], selectedIngredient, 'single');
    expect(pizzaIngredients).toHaveLength(1);
});

it('Should add 1 to quantity on existing pizza ingredient', () => {
    const selectedIngredient: IngredientVM = {
        description: 'test',
        id: 1,
        multiplicity: 2,
        name: 'test',
        quantity: 0,
        type: 'simple',
        selected: false,
        price: 0
    };
    const pizzaIngredients = checkSelection(
        [{ ...selectedIngredient, quantity: 1 }],
        selectedIngredient,
        'add'
    );
    expect(pizzaIngredients).toHaveLength(1);
    expect(pizzaIngredients[0].quantity).toBe(2);
});

it('Should remove ingredient form pizza when quantity equals 0', () => {
    const selectedIngredient: IngredientVM = {
        description: 'test',
        id: 1,
        multiplicity: 2,
        name: 'test',
        quantity: 0,
        type: 'simple',
        selected: false,
        price: 0
    };
    const pizzaIngredients = checkSelection(
        [{ ...selectedIngredient, quantity: 1 }],
        selectedIngredient,
        'pop'
    );
    expect(pizzaIngredients).toHaveLength(0);
});

it('Should deselect all another dough ingredients when other dough is selected', () => {
    const dough1: IngredientVM = {
        description: 'test',
        id: 1,
        multiplicity: 2,
        name: 'test',
        quantity: 0,
        type: 'dough',
        selected: true,
        price: 0
    };
    const dough2: IngredientVM = {
        description: 'test',
        id: 2,
        multiplicity: 2,
        name: 'test',
        quantity: 0,
        type: 'dough',
        selected: false,
        price: 0
    };
    const pizzaIngredients = checkSelection([dough1], dough2, 'single');

    expect(pizzaIngredients).toHaveLength(1);
    expect(pizzaIngredients[0].id).toBe(dough2.id);
});

it('Should mark as selected an ingredint in full ingredients array', () => {
const ingredient: IngredientVM = {
    description: 'test',
    id: 1,
    multiplicity: 0,
    name: 'test',
    quantity: 0,
    type: 'dough',
    selected: false,
    price: 0
};
const ingredients = [ingredient];
const pizzaIngredients = checkSelection([], ingredient, 'single');

const listIngredients = updateIngredientsSelection(ingredients, pizzaIngredients);

expect(listIngredients[0].selected).toBeTruthy();

})
