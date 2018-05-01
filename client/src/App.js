import React, { Fragment } from 'react';
import './App.css';


import Navbar from './components/navbar/Navbar';
import Main from './containers/Main';

class App extends React.Component {
  state={
    isAuthenticated: false,
  }


  changeAuth = () => {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated,
    });
  }

  render() {
    return (

      <Fragment>
        <Navbar auth={this.state.isAuthenticated} />
        <Main changeAuth={this.changeAuth} />
      </Fragment>
    );
  }
}

export default App;
