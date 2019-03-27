import React from 'react';
import { CountryVM, ProvinceVM } from '../../domain/models';

import './price.scss';

interface IPriceProps {
  location: { country?: CountryVM; province?: ProvinceVM };
  totalAmount: number;
}
export function Price(props: IPriceProps): JSX.Element {
  return (
    <div className="pw-price">
      <div className="pw-price__header">
        <h3>{`Total: ${props.totalAmount}`}</h3>
        <i className="material-icons">format_list_bulleted</i>
      </div>
    </div>
  );
}
