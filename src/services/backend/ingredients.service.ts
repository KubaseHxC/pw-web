import { IngredientVM } from '../../domain/models';
import { BASE_URL } from '../../env';

const get = (): Promise<IngredientVM[]> =>
  fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response =>
    response.json().then(parsedResult => parsedResult as IngredientVM[])
  );

export { get };
