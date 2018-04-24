import React from 'react';
import PropTypes from 'prop-types';
import { signInUser, createUserAPI } from '../utils/userAPI';
import { saveToken } from '../utils/authService';
import { passwordCheck } from './helperFunctions';

/* THIS HOC CONTROLLS THE SIGNIN & SIGNUP COMPONENTs  */

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends React.Component {
    static propTypes = {
      updateIsLoggedIn: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
    }

    state = {
      credentials: {},
      error: '',
    }

    // grabs value from input
    changeValue = (event) => {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [event.currentTarget.name]: event.currentTarget.value,
        },
      });
    }

    // used with Login component
    submitUser = (event) => {
      event.preventDefault();
      signInUser(this.state.credentials, (res) => {
        if (res.status !== 200) {
          this.setState({ error: res.data.message });
          console.log(this.state.error);
        } else {
          console.log(res);
          saveToken(res.data.ssid);
          this.props.updateIsLoggedIn();
        }
      });
    }

    // used with signup component
    signUpUser = (event) => {
      event.preventDefault();
      if (this.state.error) {
        this.setState({ error: '' });
      }

      const { email, password, checkPassword } = this.state.credentials;
      passwordCheck(password, checkPassword, (check) => {
        if (check) {
          createUserAPI({ email, password }, (response) => {
            if (response.status !== 201) {
              this.setState({ error: response.data.message });
              console.log(this.state.error);
            } else {
              saveToken(response.data.ssid);
              this.props.updateIsLoggedIn();
              this.props.history.push('/'); // maybe try a redirect instead
            }
          });
        } else {
          this.setState({ error: 'Passwords Do Not Match' });
        }
      });
      // rest
      event.currentTarget.reset();
    }

    render() {
      return (
        <AuthComponent
          {...this.props}
          error={this.state.error}
          changeValue={this.changeValue}
          submitUser={this.submitUser}
          signUpUser={this.signUpUser}
        />
      );
    }
  };
}
