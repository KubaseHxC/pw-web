import React from 'react';

export function Ingredient({ ingredient, onClick }) {
  return (
    <div className="pw-ingredient" onClick={() => onClick(ingredient)}>
      {ingredient.name}
    </div>
  );
}
