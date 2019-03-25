import React from 'react';
import Logo from '../../logo.svg';

import './header.scss';

export function Header(props) {
    return (
        <header className='pw-header'>
            <div className='pw-header__logo'>{/* <img src={Logo} /> */}</div>
            <div className='pw-header__title'>Header</div>
            <div />
        </header>
    );
}
