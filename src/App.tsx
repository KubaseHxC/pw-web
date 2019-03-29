import React, { useState } from 'react';
import { Header } from './components';

import { Content } from './pages/content';
import { LocalStorageController } from './services/local/local-storage.controller';
import { PizzaVM } from './domain/models';

import Heart from './assets/heart-regular.svg';
import ReactIcon from './assets/react-brands.svg';
import './App.scss';

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
            <footer className='mdl-mini-footer'>
                <div className='mdl-mini-footer__left-section'>
                    Made by Iván Luis Sánchez with{' '}
                    <img src={Heart} style={{ height: '16px' }} /> and{' '}
                    <img src={ReactIcon} style={{ height: '16px' }} />
                </div>
            </footer>
        </div>
    );
}

export default App;
