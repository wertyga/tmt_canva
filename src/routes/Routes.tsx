import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Polotno from '../components/Polotno/PolotnoRoot';

export default () => (
  <Switch>
    <Route
      path="*"
      component={Polotno}
    />
  </Switch>
);
