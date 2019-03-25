import React from 'react';
import { IngredientsList } from './list/ingredients-list';
import { IngredientMaker } from './maker/maker';

export function Ingredients({ ingredients, onCreateClick, onIngredientClick }) {
    return (
        <div className='pw-ingredients__container'>
            <IngredientsList
                ingredients={ingredients}
                onIngredientClick={onIngredientClick}
            />
            <IngredientMaker onSubmitClick={onCreateClick} />
        </div>
    );
}
