import React from 'react';
import { IngredientsList } from './list/ingredients-list';

import './ingredients-container.scss';
import { IngredientVM } from '../../domain/models';

export function Ingredients({
  ingredients,
  onIngredientClick
}: {
  ingredients: IngredientVM[];
  onIngredientClick: Function;
}): JSX.Element {
  const filterByType = (type: 'dough' | 'simple') =>
    ingredients.filter(i => i.type === type);
  return (
    <div className="pw-ingredients__container">
      <IngredientsList
        ingredients={filterByType('dough')}
        onIngredientClick={onIngredientClick}
      />
      <IngredientsList
        ingredients={filterByType('simple')}
        onIngredientClick={onIngredientClick}
      />
    </div>
  );
}
