import React from 'react';
import PropTypes from 'prop-types';
import AuthService from '../utils/AuthService';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends React.Component {
    static propTypes = {
      changeAuth: PropTypes.func,
    }

    state = {
      email: '',
      password: '',
    }

    Auth = new AuthService();

    changeValue = (event) => {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }

    loginUser = (event) => {
      event.preventDefault();
      this.Auth.signIn(this.state.email, this.state.password, (res) => {
        console.log('AUTH RES', res);
        if (res === 200) {
          this.props.changeAuth();
          this.props.history.replace('/');
        }
      });
    };

    signUpUser = (event) => {
      event.preventDefault();
      this.Auth.signUp(this.state.email, this.state.password, (response) => {
        console.log('HOC', response);
      });
    }

    authProps = {
      changeValue: this.changeValue,
      loginUser: this.loginUser,
      signUpUser: this.signUpUser,
    };

    render() {
      return (
        <AuthComponent {...this.props} {...this.authProps} />
      );
    }
  };
}
