import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/routes/Routes';

import 'antd/dist/antd.css';
import '../src/assets/global.css';
import '../src/assets/atom.css';
import '../src/assets/variables.css';

const ClientApp = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

hydrate(<ClientApp />, document.getElementById('root'));
