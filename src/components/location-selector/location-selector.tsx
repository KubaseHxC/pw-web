import React from 'react';
import { CountryVM, ProvinceVM } from '../../domain/models';

interface ILocationSelectorProps {
    countries: CountryVM[];
    provinces: ProvinceVM[];
    onCountrySelect(country: CountryVM): void;
    onProvinceSelect(province: ProvinceVM): void;
    selectedLocation: {
        country: CountryVM;
        province: ProvinceVM;
    };
}

export function LocationSelector(props: ILocationSelectorProps): JSX.Element {
    return (
        <div className='pw-location'>
            <div className='pw-location__form'>
                <select className='pw-location__select'>
                    {props.countries.map((c, i) => (
                        <option
                            key={i}
                            value={c.id}
                            selected={
                                c.id === props.selectedLocation.country.id
                            }
                        >
                            {' '}
                            {`${c.name} (${c.tax}%)`}{' '}
                        </option>
                    ))}
                </select>
            </div>
            <select className='pw-location__select'>
                {props.provinces.map((p, i) => (
                    <option
                        key={i}
                        value={p.id}
                        selected={p.id === props.selectedLocation.province.id}
                    >
                        {' '}
                        {`${p.name} ${
                            p.additionalTax ? `(${p.additionalTax})` : ''
                        }`}{' '}
                    </option>
                ))}
            </select>
        </div>
    );
}
