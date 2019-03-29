import React from 'react';
import { CountryVM, ProvinceVM } from '../../domain/models';

import './location-selector.scss';

interface ILocationSelectorProps {
  countries: CountryVM[];
  provinces: ProvinceVM[];
  onCountrySelect(countryId: number): void;
  onProvinceSelect(provinceId: number): void;
  selectedLocation: {
    countryId: number;
    provinceId: number;
  };
}

export function LocationSelector(props: ILocationSelectorProps): JSX.Element {
  return (
    <div className="pw-location">
      <div className="pw-location__form">
        <div className="pw-location__select">
          <select
            value={props.selectedLocation.countryId}
            onChange={({ target }) =>
              props.onCountrySelect(Number(target.value))
            }
          >
            {props.countries.map((c, i) => (
              <option key={i} value={c.id}>
                {`${c.name} (${c.tax}%)`}
              </option>
            ))}
          </select>
        </div>
        <div className="pw-location__select">
          <select
            value={props.selectedLocation.provinceId}
            onChange={({ target }) =>
              props.onProvinceSelect(Number(target.value))
            }
          >
            {props.provinces.map((p, i) => (
              <option key={i} value={p.id}>
                {`${p.name} ${p.additionalTax ? `(${p.additionalTax}%)` : ''}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
