import React from 'react';
import { Ingredient } from '../ingredient/ingredient';

import './ingredients-list.scss';

export function IngredientsList({ ingredients = [], onIngredientClick }: any): JSX.Element {
    return (
        <div className='pw-ingredients__list'>
            {ingredients.map((ingredient: any, i: number) => (
                <Ingredient
                    key={i}
                    ingredient={ingredient}
                    onClick={onIngredientClick}
                />
            ))}
        </div>
    );
}
