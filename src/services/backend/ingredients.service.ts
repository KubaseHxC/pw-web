import { IngredientVM } from '../../domain/models';

const get = (): Promise<IngredientVM[]> =>
  fetch('http://localhost:3001/ingredients', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response =>
    response.json().then(parsedResult => parsedResult as IngredientVM[])
  );

export { get };
