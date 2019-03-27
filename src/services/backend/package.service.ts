import { IngredientVM, CountryVM, ProvinceVM } from '../../domain/models';

const calculate = async (
  location: { country: CountryVM; province: ProvinceVM },
  ingredients: IngredientVM[]
): Promise<number> => {
  return await fetch('http://localhost:3001/package', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      country: location.country.id,
      province: location.province.id,
      ingredients: pluckIngredients(ingredients)
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