/* Without isLoading flag, the page wouldn't work properly after refresh or when going to dashboard typed in   * URL
*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../utils/AuthService';


class PrivateRoute extends React.Component {
  state = {
    loggedIn: false,
    isLoading: true,
    shouldRedirect: false,
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  Auth = new AuthService();

  // working on trying to verify token on server side

  // checkLoggedIn = () => {
  //   this.Auth.tokenCheck((result) => {
  //     if (result) {
  //       this.setState({ loggedIn: true, isLoading: false });
  //     } else {
  //       this.setState({ shouldRedirect: true, isLoading: false });
  //     }
  //   });
  // }

  checkLoggedIn = () => {
    const token = localStorage.getItem('tkid');
    console.log(token);
    if (token) {
      this.setState({ loggedIn: true, isLoading: false });
    } else {
      this.setState({ shouldRedirect: true, isLoading: false });
    }
  }

  render() {
    // need isAuth in order to use the redirect from login
    const { component: Component, isAuth, ...rest } = this.props;
    if (this.state.isLoading) {
      return (<h1>Loading</h1>);
    }
    return (
      <Route
        {...rest}
        render={props =>
          (isAuth || this.state.loggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
              pathname: '/login',
              state: { from: props.location },
            }}
            />
            ))
          }
      />
    );
  }
}

export default PrivateRoute;
