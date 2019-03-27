import React from 'react';
import Logo from '../../logo.svg';

import './header.scss';
import { CountryVM, ProvinceVM } from '../../domain/models';

interface IHeaderProps {
  countries: CountryVM[];
  onCountrySelect(country: CountryVM): void;
  onProvinceSelect(province: ProvinceVM): void;
  className: string; //@TODO delete
}

export function Header(props: IHeaderProps): JSX.Element {
  return (
    <header className="pw-header mdl-layout__header">
      <div className="pw-header__logo">{/* <img src={Logo} /> */}</div>
      <div className="pw-header__title">Header</div>
      <div />
    </header>
  );
}
