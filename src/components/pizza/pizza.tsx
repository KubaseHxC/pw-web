import React from 'react';

import './pizza.scss';
import { IngredientVM } from '../../domain/models';
import { IngredientChip } from '../ingredients/chip/ingredient-chip';

interface IPizzaProps {
  ingredients: IngredientVM[];
  onDeleteClick(ingredient: IngredientVM): void;
}

export function Pizza({
  ingredients,
  onDeleteClick
}: IPizzaProps): JSX.Element {
  return (
    <div className="pw-pizza">
      <div className="pw-pizza__ingredients-container">
        {ingredients.map((ingredient, i) => (
          <IngredientChip
            key={i}
            ingredient={ingredient}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </div>
  );
}
