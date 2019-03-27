import React from 'react';
import Logo from '../../logo.svg';

import './header.scss';

export function Header(props: any): JSX.Element {
    return (
        <header className='pw-header mdl-layout__header'>
            <div className='pw-header__logo'>{/* <img src={Logo} /> */}</div>
            <div className='pw-header__title'>Header</div>
            <div />
        </header>
    );
}
