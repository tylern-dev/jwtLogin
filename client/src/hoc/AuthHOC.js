import React from 'react';
import PropTypes from 'prop-types';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends React.Component {
    static propTypes = {
      changeAuth: PropTypes.func,
    }

    state = {
      email: '',
      password: '',

    }

    changeValue = (event) => {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }

    loginUser = (event) => {
      event.preventDefault();
      this.props.changeAuth();
    };

    authProps = {
      changeValue: this.changeValue,
      loginUser: this.loginUser,
    };
    render() {
      return (
        <AuthComponent {...this.props} {...this.authProps} />
      );
    }
  };
}
