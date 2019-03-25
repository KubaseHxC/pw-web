import React, { useState } from 'react';

export function IngredientMaker({ onSubmitClick }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        multiplicity: 1,
        type: 'simple'
    });

    return (
        <div className='pw-ingredient__maker'>
            <div className='pw-ingredient__maker-form'>
                <label>
                    Name
                    <input
                        type='text'
                        value={formData.name}
                        onChange={({ target }) =>
                            setFormData({ ...formData, name: target.value })
                        }
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={formData.description}
                        onChange={({ target }) =>
                            setFormData({ ...formData, description: target.value })
                        }
                    />
                </label>
                <label>
                    Cantidad Máxima
                    <input
                        type='number'
                        value={formData.multiplicity}
                        onChange={({ target }) =>
                            setFormData({ ...formData, multiplicity: target.value })
                        }
                    />
                </label>
                <label>
                    Masa
                    <input
                        type='radio'
                        name='type'
                        id='dough'
                        checked={formData.type === 'dough'}
                        onChange={({ target }) =>
                            setFormData({ ...formData, type: 'dough' })
                        }
                    />
                </label>
                
                <label>
                    Simple
                    <input
                        type='radio'
                        name='type'
                        id='simple'
                        checked={formData.type === 'simple'}
                        onChange={({ target }) =>
                            setFormData({ ...formData, type: 'simple' })
                        }
                    />
                </label>
                <div>
                    <button onClick={() => onSubmitClick(formData)}>
                        Crear
                    </button>
                </div>
            </div>
        </div>
    );
}
