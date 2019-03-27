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
    selected: false
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
    selected: false
  };
  const pizzaIngredients = checkSelection([{...selectedIngredient, quantity: 1}], selectedIngredient, 'add');
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
    selected: false
  };
  const pizzaIngredients = checkSelection([{...selectedIngredient, quantity: 1}], selectedIngredient, 'pop');
  expect(pizzaIngredients).toHaveLength(0);
});
