import React, { useState, useEffect } from 'react';
import { Pizza, Ingredients, Price } from '../components';
import { IngredientVM, CountryVM, ProvinceVM } from '../domain/models';
import {
    IngredientsService,
    PackageService,
    CountriesService
} from '../services/backend';
import {
    checkSelection,
    updateIngredientsSelection
} from '../components/ingredients/list/selection.logic';

import './content.scss';
import { LocationSelector } from '../components/location-selector/location-selector';

export function Content(props: any): JSX.Element {
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
        { country?: CountryVM; province?: ProvinceVM },
        Function
    ] = useState({});

    const [totalAmount, setTotalAmount] = useState(0);

    //Define effects
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
                props.location,
                selectedIngredients
            );
            setTotalAmount(totalAmount);
        }
        getAmount();
    }, [props.location, selectedIngredients]);

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

    const onDeleteClick = (ingredient: IngredientVM) => {
        const newIngredients = selectedIngredients.filter(
            pizzaIngredient => ingredient.id !== pizzaIngredient.id
        );
        setSelectedIngredients(newIngredients);
        const updatedIngredients = updateIngredientsSelection(
            ingredients,
            newIngredients
        );
        setIngredients(updatedIngredients);
    };

    return (
        <React.Fragment>
            <div className='pw-container__left-layout'>
                <LocationSelector />
                <Price
                    location={props.location}
                    totalAmount={totalAmount}
                    ingredients={selectedIngredients}
                />
            </div>
            <Ingredients
                ingredients={ingredients}
                onIngredientClick={onIngredientClick}
            />
        </React.Fragment>
    );
}
