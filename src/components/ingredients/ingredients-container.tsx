import React from 'react';
import { IngredientsList } from './list/ingredients-list';

import './ingredients-container.scss';

export function Ingredients({ ingredients, onIngredientClick }: any): JSX.Element {
  return (
    <div className="pw-ingredients__container">
      <IngredientsList
        ingredients={ingredients}
        onIngredientClick={onIngredientClick}
      />
    </div>
  );
}
