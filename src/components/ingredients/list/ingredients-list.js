import React from 'react';
import { Ingredient } from '../ingredient/ingredient';

import './ingredients-list.scss';

export function IngredientsList({ ingredients = [], onIngredientClick }) {
    return (
        <div className='pw-ingredients__list'>
            {ingredients.map((ingredient, i) => (
                <Ingredient
                    key={i}
                    ingredient={ingredient}
                    onClick={onIngredientClick}
                />
            ))}
        </div>
    );
}
