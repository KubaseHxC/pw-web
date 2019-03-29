import React, { useState } from 'react';
import { CountryVM, ProvinceVM } from '../../domain/models';
import { LocationSelector } from '../location-selector/location-selector';

import './configuration.scss';

interface IConfigurationProps {
    countries: CountryVM[];
    onSaveClick({ provinceId, tax }: { provinceId: number; tax: number }): void;
}

export const Configuration = ({
    countries,
    onSaveClick
}: IConfigurationProps) => {
    const [location, setLocation]: [
        { countryId: number; provinceId: number },
        Function
    ] = useState({ countryId: 1, provinceId: 1 });

    const [formData, setFormData] = useState({
        tax: 0,
        freeTax: false
    });

    const getProvincesByCountry = (countryId: number): ProvinceVM[] => {
        const country = countries.find(c => c.id === countryId);
        if (country) {
            return country.provinces;
        }
        return [];
    };

    const onCountrySelect = (countryId: number): void => {
        const country = countries.find(c => c.id === countryId);
        if (country) {
            const firstProvince = country.provinces[0];
            setFormData({
                tax: firstProvince.additionalTax || 0,
                freeTax: !firstProvince.additionalTax
            });
            setLocation({
                countryId: country.id,
                provinceId: firstProvince.id
            });
        }
    };

    const onProvinceSelect = (provinceId: number): void => {
        const provinces = countries.reduce(
            (prev: ProvinceVM[], curr: CountryVM) =>
                prev.concat(curr.provinces || []),
            []
        );
        const selectedProvince = provinces.find(p => p.id === provinceId);
        if (selectedProvince) {
            setFormData({
                tax: selectedProvince.additionalTax || 0,
                freeTax: !selectedProvince.additionalTax
            });
        }
        setLocation({ ...location, provinceId });
    };

    const handleOnSaveClick = () => {
        onSaveClick({
            provinceId: location.provinceId,
            tax: formData.freeTax ? 0 : formData.tax
        });
    };

    return (
        <div className='pw-configuration'>
            <div className='pw-configuration__container'>
                <LocationSelector
                    countries={countries}
                    provinces={getProvincesByCountry(location.countryId)}
                    selectedLocation={location}
                    onCountrySelect={onCountrySelect}
                    onProvinceSelect={onProvinceSelect}
                />
                {location.provinceId ? (
                    <div className='pw-configuration__form-wrapper'>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                            <label>Impuesto añadido</label>
                            <input
                                className='mdl-textfield__input'
                                type='number'
                                placeholder='Impuesto añadido'
                                disabled={formData.freeTax}
                                onChange={({ target }) => {
                                    setFormData({
                                        ...formData,
                                        tax: Number(target.value)
                                    });
                                }}
                                value={formData.tax}
                            />
                        </div>
                        <label className='mdl-checkbox' htmlFor='checkbox-1'>
                            <input
                                type='checkbox'
                                id='checkbox-1'
                                className='mdl-checkbox__input'
                                checked={formData.freeTax}
                                onChange={() => {
                                    setFormData({
                                        ...formData,
                                        freeTax: !formData.freeTax
                                    });
                                }}
                            />
                            <span className='mdl-checkbox__label'>
                                Libre de impuestos
                            </span>
                        </label>
                    </div>
                ) : (
                    'Seleccione una provincia'
                )}
                <button
                    className='mdl-button mdl-js-button mdl-button--primary'
                    onClick={handleOnSaveClick}
                    disabled={!formData.freeTax && formData.tax === 0}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};
