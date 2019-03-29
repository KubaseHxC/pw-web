import React, { useState } from 'react';
import { Header } from './components';

import './App.scss';
import { Content } from './pages/content';
import { LocalStorageController } from './services/local/local-storage.controller';
import { PizzaVM } from './domain/models';

export function App(): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    /*const previousPizza = LocalStorageController.get<PizzaVM>('pizza');
    if (!previousPizza) {
        LocalStorageController.save<PizzaVM>('pizza', {
            location: { countryId: 1, provinceId: 1 },
            selectedIngredients: []
        });
    }*/
    const onConfigClick = () => {
        setShowModal(true);
    };
    return (
        <div className='pw-app'>
            <Header onConfigClick={onConfigClick} />
            <div className='pw-body'>
                <Content
                    showConfigurationModal={showModal}
                    handleCloseModal={() => setShowModal(false)}
                />
            </div>
            <footer className='mdl-mini-footer' />
        </div>
    );
}

export default App;
