/* eslint react/jsx-closing-tag-location: 0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


class Navbar extends React.Component {
  static propTypes = {
    auth: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }
  render() {
    return (
      <nav className="navigation">
        <ul>

          <NavLink to="/"><h3>Logo</h3></NavLink>

          { this.props.auth
            ? <NavLink to="/" onClick={this.props.handleLogout}>Logout</NavLink>
            : <Fragment>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </Fragment>
          }

        </ul>
      </nav>
    );
  }
}

export default Navbar;
