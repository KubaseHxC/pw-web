import React, { useState, useEffect } from 'react';
import { Pizza, Ingredients, Price } from '../components';
import { IngredientVM, CountryVM } from '../domain/models';
import { IngredientsService, CountriesService } from '../services/backend';

export function Content(): JSX.Element {
  const [ingredients, setIngredients]: [IngredientVM[], Function] = useState(
    []
  );
  useEffect(() => {
    async function requestIngredients() {
      const reqIngredients = await IngredientsService.get();
      setIngredients(reqIngredients);
    }
    requestIngredients();
  }, []);

  

  const onIngredientClick = (
    ingredient: IngredientVM,
    action: 'add' | 'pop' | 'single'
  ) => {
    console.log(ingredient, action);
  };

  return (
    <React.Fragment>
      <Pizza />
      <Ingredients
        ingredients={ingredients}
        onIngredientClick={onIngredientClick}
      />
      <Price />
    </React.Fragment>
  );
}
