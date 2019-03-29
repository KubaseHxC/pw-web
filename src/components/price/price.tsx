import React from 'react';
import { CountryVM, ProvinceVM, IngredientVM } from '../../domain/models';

import './price.scss';

interface IPriceProps {
  totalAmount: number;
  ingredients: IngredientVM[];
}
export function Price(props: IPriceProps): JSX.Element {
  return (
    <div className="pw-price">
      <div className="pw-price__total">
        <h3>{`Total: ${props.totalAmount}€`}</h3>
      </div>
      <div className="pw-price__body">
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">Ingrediente</th>
              <th>Cantidad</th>
              <th>Precio Ud</th>
            </tr>
          </thead>
          <tbody>
            {props.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td className="mdl-data-table__cell--non-numeric">
                  {ingredient.name}
                </td>
                <td>{ingredient.quantity || 1}</td>
                <td>{`${ingredient.price}€`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
