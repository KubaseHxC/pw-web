import React, { useState, useEffect } from 'react';
import { Pizza, Ingredients, Price } from '../components';
import { IngredientVM, CountryVM, ProvinceVM } from '../domain/models';
import {
  IngredientsService,
  PackageService,
  CountriesService,
  ProvincesService
} from '../services/backend';
import {
  checkSelection,
  updateIngredientsSelection
} from '../components/ingredients/list/selection.logic';

import './content.scss';
import { LocationSelector } from '../components/location-selector/location-selector';
import { Modal } from '../components/modal/modal';
import { Configuration } from '../components/configuration/configuration';

export function Content({
  showConfigurationModal,
  handleCloseModal
}: {
  showConfigurationModal: boolean;
  handleCloseModal(): void;
}): JSX.Element {
  // Define State
  const [ingredients, setIngredients]: [IngredientVM[], Function] = useState(
    []
  );
  const [selectedIngredients, setSelectedIngredients]: [
    IngredientVM[],
    Function
  ] = useState([]);

  const [countries, setCountries]: [CountryVM[], Function] = useState([]);

  const [location, setLocation]: [
    { countryId: number; provinceId: number },
    Function
  ] = useState({ countryId: 1, provinceId: 1 });

  const [totalAmount, setTotalAmount] = useState(0);

  //Define effects
  useEffect(() => {
    async function requestCountries() {
      const reqCountries = await CountriesService.get();
      setCountries(reqCountries);
      setLocation({
        //@Todo delete
        countryId: reqCountries[0].id,
        provinceId: reqCountries[0].provinces[0].id // Optimism :)
      });
    }
    requestCountries();
  }, []);

  useEffect(() => {
    async function requestIngredients() {
      const reqIngredients = await IngredientsService.get();
      const firstDough = reqIngredients.find(i => i.type === 'dough');
      const defaultIngredients = firstDough
        ? updateIngredientsSelection(reqIngredients, [firstDough])
        : reqIngredients;
      if (firstDough) {
        setSelectedIngredients([firstDough]);
      }
      setIngredients(defaultIngredients);
    }
    requestIngredients();
  }, []);

  useEffect(() => {
    async function getAmount() {
      const totalAmount = await PackageService.calculate(
        location,
        selectedIngredients
      );
      setTotalAmount(totalAmount);
    }
    getAmount();
  }, [location, selectedIngredients]);

  const onIngredientClick = (
    ingredient: IngredientVM,
    action: 'add' | 'pop' | 'single'
  ) => {
    const newIngredients = checkSelection(
      selectedIngredients,
      ingredient,
      action
    );
    setSelectedIngredients(newIngredients);
    const updatedIngredients = updateIngredientsSelection(
      ingredients,
      newIngredients
    );
    setIngredients(updatedIngredients);
  };

  const onCountrySelect = (countryId: number): void => {
    const country = countries.find(c => c.id === countryId);
    if (country) {
      setLocation({
        countryId: country.id,
        provinceId: country.provinces[0].id
      });
    }
  };

  const onProvinceSelect = (provinceId: number): void => {
    setLocation({ ...location, provinceId });
  };

  const getProvincesByCountry = (countryId: number): ProvinceVM[] => {
    const country = countries.find(c => c.id === countryId);
    if (country) {
      return country.provinces;
    }
    return [];
  };

  const onConfigurationSave = async ({
    provinceId,
    tax
  }: {
    provinceId: number;
    tax: number;
  }) => {
    const newProvince = await ProvincesService.update(provinceId, tax);
    const newCountries = countries.map(c => {
      if (c.provinces.find(p => p.id === newProvince.id)) {
        return {
          ...c,
          provinces: c.provinces.map(p => {
            if (p.id === newProvince.id) {
              return newProvince;
            }
            return p;
          })
        };
      }
      return c;
    });
    setCountries(newCountries);
  };

  return (
    <React.Fragment>
      <div className="pw-container__left-layout">
        <LocationSelector
          countries={countries}
          provinces={getProvincesByCountry(location.countryId)}
          selectedLocation={location}
          onCountrySelect={onCountrySelect}
          onProvinceSelect={onProvinceSelect}
        />
        <Price totalAmount={totalAmount} ingredients={selectedIngredients} />
      </div>
      <Ingredients
        ingredients={ingredients}
        onIngredientClick={onIngredientClick}
      />
      <Modal
        show={showConfigurationModal}
        handleClose={handleCloseModal}
        title="Configuración"
      >
        <Configuration
          countries={countries}
          onSaveClick={onConfigurationSave}
        />
      </Modal>
    </React.Fragment>
  );
}
