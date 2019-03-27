import React from 'react';
import { IngredientVM } from '../../../domain/models';

export function IngredientChip({
  ingredient,
  onDeleteClick
}: {
  ingredient: IngredientVM;
  onDeleteClick: Function;
}): JSX.Element {
  return (
    <span className="mdl-chip mdl-chip--deletable">
      <span className="mdl-chip__text">{ingredient.name}</span>
      <button type="button" className="mdl-chip__action">
        <i className="material-icons" onClick={() => onDeleteClick(ingredient)}>
          cancel
        </i>
      </button>
    </span>
  );
}
