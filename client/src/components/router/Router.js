import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../containers/Home';
import Signup from '../../containers/Signup';
import Login from '../../containers/Login';
import NotFound from '../../containers/NotFound';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signup" render={props => <Signup {...props} updateIsLoggedIn={this.updateIsLoggedIn} />} />
    <Route path="/login" render={props => <Login {...props} updateIsLoggedIn={this.updateIsLoggedIn} />} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
