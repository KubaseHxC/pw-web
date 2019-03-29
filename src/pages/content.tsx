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
import { LocalStorageController } from '../services/local/local-storage.controller';
import { PizzaVM } from '../domain/models';

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
    const [countries, setCountries]: [CountryVM[], Function] = useState([]);
    const [pizza, setPizza]: [PizzaVM, Function] = useState(new PizzaVM());
    const [totalAmount, setTotalAmount] = useState(0);

    //Define effects
    useEffect(() => {
        Promise.all([CountriesService.get(), IngredientsService.get()]).then(
            ([reqCountries, reqIngredients]) => {
                const pizza = LocalStorageController.get<{
                    location: { provinceId: number; countryId: number };
                    selectedIngredients: IngredientVM[];
                }>('pizza');
                setCountries(reqCountries);
                if (pizza) {
                    console.log('pizza found ', pizza);
                    setPizza(pizza);
                    setIngredients(
                        updateIngredientsSelection(
                            reqIngredients,
                            pizza.selectedIngredients
                        )
                    );
                } else {
                    console.log('pizza not found');
                    const location = {
                        countryId: reqCountries[0].id,
                        provinceId: reqCountries[0].provinces[0].id // Optimism :)
                    };
                    const firstDough = reqIngredients.find(
                        i => i.type === 'dough'
                    );
                    const defaultIngredients = firstDough
                        ? updateIngredientsSelection(reqIngredients, [
                              firstDough
                          ])
                        : reqIngredients;
                    if (firstDough) {
                        setPizza({
                            location,
                            selectedIngredients: [firstDough]
                        });
                    } else {
                        setPizza({ location, selectedIngredients: [] });
                    }
                    setIngredients(defaultIngredients);
                }
            }
        );
    }, []);

    useEffect(() => {
        async function getAmount() {
            const totalAmount = await PackageService.calculate(pizza);
            LocalStorageController.save<PizzaVM>('pizza', pizza);
            setTotalAmount(totalAmount);
        }
        if (pizza.selectedIngredients.length !== 0) {
            getAmount();
        }
    }, [pizza]);

    const onIngredientClick = (
        ingredient: IngredientVM,
        action: 'add' | 'pop' | 'single'
    ) => {
        const newIngredients = checkSelection(
            pizza.selectedIngredients,
            ingredient,
            action
        );
        setPizza({
            location: pizza.location,
            selectedIngredients: newIngredients
        });
        const updatedIngredients = updateIngredientsSelection(
            ingredients,
            newIngredients
        );
        setIngredients(updatedIngredients);
    };

    const onCountrySelect = (countryId: number): void => {
        const country = countries.find(c => c.id === countryId);
        if (country) {
            setPizza({
                ...pizza,
                location: {
                    countryId: country.id,
                    provinceId: country.provinces[0].id
                }
            });
        }
    };

    const onProvinceSelect = (provinceId: number): void => {
        setPizza({
            ...pizza,
            location: {
                ...pizza.location,
                provinceId: provinceId
            }
        });
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
            <div className='pw-container__left-layout'>
                <LocationSelector
                    countries={countries}
                    provinces={getProvincesByCountry(pizza.location.countryId)}
                    selectedLocation={pizza.location}
                    onCountrySelect={onCountrySelect}
                    onProvinceSelect={onProvinceSelect}
                />
                <Price
                    totalAmount={totalAmount}
                    ingredients={pizza.selectedIngredients}
                />
            </div>
            <Ingredients
                ingredients={ingredients}
                onIngredientClick={onIngredientClick}
            />
            <Modal
                show={showConfigurationModal}
                handleClose={handleCloseModal}
                title='Configuración'
            >
                <Configuration
                    countries={countries}
                    onSaveClick={onConfigurationSave}
                />
            </Modal>
        </React.Fragment>
    );
}
