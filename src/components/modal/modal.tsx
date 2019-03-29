import React from 'react';

import './modal.scss';

interface IModalProps extends JSX.ElementChildrenAttribute {
  show: boolean;
  title: string;
  handleClose(): void;
}

export const Modal = ({ handleClose, show, title, children }: IModalProps) => {
  const showHideClassName = show
    ? 'modal-backdrop display-block'
    : 'modal-backdrop display-none';

  return (
    <div className={showHideClassName} onClick={handleClose}>
          <section className="modal-main mdl-shadow--4dp" onClick={e => { e.stopPropagation(); return false;}}>
        <div className="modal-header">
          <h3>{title}</h3>
          <a className="material-icons" onClick={handleClose}>
            close
          </a>
        </div>
        <hr />
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
};
