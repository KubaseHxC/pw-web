import React, { Component, useState, useEffect } from 'react';
import { Header } from './components';

import './App.css';
import { Content } from './pages/content';
import { CountryVM, ProvinceVM } from './domain/models';
import { CountriesService, ProvincesService } from './services/backend';

export function App(): JSX.Element {
  const [countries, setCountries]: [CountryVM[], Function] = useState([]);
  useEffect(() => {
    async function requestCountries() {
      const reqCountries = await CountriesService.get();
      setCountries(reqCountries);
    }
    requestCountries();
  }, []);

  const [location, setLocation]: [
    { country?: CountryVM; province?: ProvinceVM },
    Function
  ] = useState({});

  const [provinces, setProvinces]: [ProvinceVM[], Function] = useState([]);
  useEffect(() => {
    async function requestProvinces() {
      const reqProvinces = await ProvincesService.get(
        location.country ? location.country.id : 1 // :'(
      );
      setCountries(reqProvinces);
    }
    requestProvinces();
  }, [location.country]);

  return (
    <div className="pw-app">
      <Header className="pw-header" />
      <div className="pw-body">
        <Content />
      </div>
      <footer className="mdl-mini-footer" />
    </div>
  );
}

export default App;
