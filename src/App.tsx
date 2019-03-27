import React, { useState, useEffect } from 'react';
import { Header } from './components';

import './App.scss';
import { Content } from './pages/content';
import { CountryVM, ProvinceVM } from './domain/models';
import { CountriesService } from './services/backend';

export function App(): JSX.Element | null {
    const [countries, setCountries]: [CountryVM[], Function] = useState([]);
    useEffect(() => {
        async function requestCountries() {
            const reqCountries = await CountriesService.get();
            setCountries(reqCountries);
            setLocation({
                //@Todo delete
                country: reqCountries[0],
                province: reqCountries[0].provinces[0]
            });
        }
        requestCountries();
    }, []);

    const [location, setLocation]: [
        { country?: CountryVM; province?: ProvinceVM },
        Function
    ] = useState({});

    return location && location.country && location.province ? (
        <div className='pw-app'>
            <Header className='pw-header' />
            <div className='pw-body'>
                <Content location={location} />
            </div>
            <footer className='mdl-mini-footer' />
        </div>
    ) : null;
}

export default App;
