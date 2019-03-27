import React from 'react';

import './ingredient.scss';

export function Ingredient({ ingredient, onClick }: any): JSX.Element {
    return (
        <div className='pw-ingredient mdl-card mdl-shadow--2dp'>
            <div className='pw-ingredient__title mdl-card__title'>
                <div className='mdl-card__title-text'>{ingredient.name}</div>
            </div>
            <div className='pw-ingredient__body mdl-card__supporting-text'>
                {ingredient.description}
            </div>
            <div className='pw-ingredient__footer mdl-card__actions'>
                {ingredient.type === 'simple' && ingredient.multiplicity > 1 ? (
                    <React.Fragment>
                        <button
                            onClick={() => onClick(ingredient, 'pop')}
                            className='pw-ingredient__button pop mdl-button mdl-js-button mdl-button--primary'
                        >
                            -
                        </button>
                        <div>{`0/${ingredient.multiplicity}`}</div>
                        <button
                            onClick={() => onClick(ingredient, 'add')}
                            className='pw-ingredient__button add mdl-button mdl-js-button mdl-button--accent'
                        >
                            +
                        </button>
                    </React.Fragment>
                ) : (
                    <button
                        onClick={() => onClick(ingredient, 'single')}
                        className='mdl-button mdl-js-button mdl-button--accent'
                    >
                        Seleccionar
                    </button>
                )}
            </div>
        </div>
    );
}
