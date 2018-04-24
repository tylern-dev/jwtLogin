import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import { isTokenExpired } from './utils/authService';

class Router extends React.Component {
  state = {
  }


  componentDidMount() {
    isTokenExpired((res) => {
      if (res) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  updateIsLoggedIn = () => {
    if (this.state.isAuthenticated === false) {
      this.setState({ isAuthenticated: true });
    }
    console.log(this.state.isAuthenticated);
  }

  handleLogout = () => {
    if (this.state.isAuthenticated) {
      this.setState({ isAuthenticated: false });
    }
    localStorage.removeItem('tkid');
  }

  // had to use render in order to pass props
  render() {
    return (

      <Fragment>
        <Navbar auth={this.state.isAuthenticated} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" render={props => <Signup {...props} updateIsLoggedIn={this.updateIsLoggedIn} />} />
          <Route path="/login" render={props => <Login {...props} updateIsLoggedIn={this.updateIsLoggedIn} />} />
          <Route component={NotFound} />
        </Switch>

      </Fragment>


    );
  }
}

export default Router;
