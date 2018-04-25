/* eslint react/jsx-closing-tag-location: 0 */
import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


class Navbar extends React.Component {
  render() {
    return (
      <nav className="navigation">
        <ul>

          <NavLink to="/"><h3>Logo</h3></NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>


        </ul>
      </nav>
    );
  }
}

export default Navbar;
