import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/router/PrivateRoute';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const Main = ({ changeAuth, isAuth }) => (
  // had to use render in order to pass props
  <Switch>
    <Route exact path="/" render={prop => <Home {...prop} />} />
    <Route path="/signup" render={prop => <Signup {...prop} updateIsLoggedIn={this.updateIsLoggedIn} />} />
    <Route path="/login" render={prop => <Login {...prop} updateIsLoggedIn={this.updateIsLoggedIn} changeAuth={changeAuth} />} />
    <PrivateRoute component={Dashboard} isAuth={isAuth} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
