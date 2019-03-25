import React from 'react';
import { Ingredient } from '../ingredient/ingredient';

import './ingredients-list.scss';

export function IngredientsList({ ingredients = [], onIngredientClick }) {
    return (
        <div className='pw-ingredients__list'>
            {ingredients.map(topping => (
                <Ingredient
                    topping={topping}
                    onClick={onIngredientClick}
                />
            ))}
        </div>
    );
}
