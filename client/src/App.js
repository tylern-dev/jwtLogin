import React, { Fragment } from 'react';
import Navbar from './components/navbar/Navbar';
import Router from './components/router/Router';

class App extends React.Component {
  state = {
    isAuthenticated: true,
  }


  // had to use render in order to pass props
  render() {
    return (

      <Fragment>
        <Navbar auth={this.state.isAuthenticated} handleLogout={this.handleLogout} />
        <Router />

      </Fragment>


    );
  }
}

export default App;
