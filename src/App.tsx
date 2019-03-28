import React, { useState } from 'react';
import { Header } from './components';

import './App.scss';
import { Content } from './pages/content';

export function App(): JSX.Element {
  const [showModal, setShowModal] = useState(true);
  const onConfigClick = () => {
    setShowModal(true);
  };
  return (
    <div className="pw-app">
      <Header onConfigClick={onConfigClick} />
      <div className="pw-body">
        <Content
          showConfigurationModal={showModal}
          handleCloseModal={() => setShowModal(false)}
        />
      </div>
      <footer className="mdl-mini-footer" />
    </div>
  );
}

export default App;
