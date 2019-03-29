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
        <div className='pw-ingredients__container'>
            <div className='pw-ingredients__list-wrapper'>
                <h3>Masa</h3>
                <IngredientsList
                    ingredients={filterByType('dough')}
                    onIngredientClick={onIngredientClick}
                />
            </div>
            <div className='pw-ingredients__list-wrapper'>
                <h3>Ingredientes</h3>
                <IngredientsList
                    className='pw-ingredient__simple-list'
                    ingredients={filterByType('simple')}
                    onIngredientClick={onIngredientClick}
                />
            </div>
        </div>
    );
}
