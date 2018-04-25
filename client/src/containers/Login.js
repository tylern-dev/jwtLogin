import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Error from '../components/Error';


const Login = ({ submitUser, changeValue, error }) => (
  <Fragment>
    <h1>Login Page</h1>
    <form onSubmit={submitUser}>
      <label htmlFor="email">Email:
        <input id="email" type="text" name="email" onChange={changeValue} />
      </label>
      <label htmlFor="password">Password:
        <input id="password" type="password" name="password" onChange={changeValue} />
      </label>
      <button type="submit">Log In</button>
    </form>
    <Error error={error} />
  </Fragment>
);

Login.propTypes = {
  submitUser: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};


export default (Login);
