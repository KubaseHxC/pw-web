import React, { useState, useEffect } from 'react';
import { Pizza, Ingredients, Price } from '../components';
import { IngredientVM, CountryVM, ProvinceVM } from '../domain/models';
import { IngredientsService, PackageService } from '../services/backend';
import {
  checkSelection,
  updateIngredientsSelection
} from '../components/ingredients/list/selection.logic';

import './content.scss';

interface IContentProps {
  location: { country: CountryVM; province: ProvinceVM };
}

export function Content(props: any): JSX.Element {
  // Define State
  const [ingredients, setIngredients]: [IngredientVM[], Function] = useState(
    []
  );
  const [selectedIngredients, setSelectedIngredients]: [
    IngredientVM[],
    Function
  ] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  //Define effects
  useEffect(() => {
    async function requestIngredients() {
      const reqIngredients = await IngredientsService.get();
      setIngredients(reqIngredients);
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
      <div className="pw-container__left-layout">
        <Pizza
          ingredients={selectedIngredients}
          onDeleteClick={onDeleteClick}
        />
        <Price location={props.location} totalAmount={totalAmount} />
      </div>
      <Ingredients
        ingredients={ingredients}
        onIngredientClick={onIngredientClick}
      />
    </React.Fragment>
  );
}
