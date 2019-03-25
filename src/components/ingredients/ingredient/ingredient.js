import React from 'react';

export function Ingredient({ ingredient, onClick }) {
    return <div class='pw-ingredient' onClick={() => onClick(ingredient)}>{ingredient.name}</div>;
}
