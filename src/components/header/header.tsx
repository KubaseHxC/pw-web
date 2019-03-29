import React from 'react';
import Logo from '../../logo.svg';

import './header.scss';

export function Header({
  onConfigClick
}: {
  onConfigClick(): void;
}): JSX.Element {
  return (
    <header className="pw-header mdl-layout__header">
      <div className="pw-header__title-wrapper">
        <div className="pw-header__logo">
          <img src={Logo} />
        </div>
        <div className="pw-header__title mdl-layout__title">Pizza Builder!</div>
        <div className="pw-header__logo right">
          <img src={Logo} />
        </div>
      </div>
      <button
        className="mdl-button mdl-js-button mdl-button--icon"
        onClick={onConfigClick}
      >
        <a className="material-icons">settings</a>
      </button>
    </header>
  );
}
