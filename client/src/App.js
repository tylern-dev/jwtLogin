import React, { Fragment } from 'react';
import './App.css';


import Navbar from './components/navbar/Navbar';
import Main from './containers/Main';
import AuthService from './utils/AuthService';

class App extends React.Component {
  state={
    isAuthenticated: false,
  }

  componentDidMount() {
    const token = this.Auth.getToken;
    if (token) {
      this.Auth.tokenCheck(token, (res) => {
        if (res) {
          this.setState({ isAuthenticated: true });
        }
      });
    }
  }


  Auth = new AuthService();

  changeAuth = () => {
    this.setState({
      isAuthenticated: true,
    });
  }

  render() {
    return (

      <Fragment>
        <Navbar auth={this.state.isAuthenticated} />
        <Main changeAuth={this.changeAuth} isAuth={this.state.isAuthenticated} />
      </Fragment>
    );
  }
}

export default App;
