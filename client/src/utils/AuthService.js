import axios from 'axios';


export default class AuthService {
  constructor() {
    this.getToken = localStorage.getItem('tkid');
    // this.setToken = localStorage.setItem('tkid', this.);
  }

  signIn = (email, password, cb) => {
    axios.post('/apiUser/login', { email, password })
      .then((response) => {
        cb(response.status);
        this.setToken(response.data.ssid);
      })
      .catch((err) => {
        cb(err);
      });
  }

  signUp = (email, password, cb) => {
    axios.post('/apiUser/signUp', { email, password })
      .then((response) => {
        console.log('service', response);
        this.setToken(response.data.ssid);
      })
      .catch(err => console.log(err));
  }

  signOut = () => {
    localStorage.clear();
  }

  tokenCheck = (token, cb) => {
    axios({
      method: 'post',
      url: '/apiToken/verifyToken',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 200) {
          cb(true);
        } else {
          cb(false);
        }
      })
      .catch((err) => {
        console.log('PrivateRoute Err', err);
        if (err) {
          cb(false);
        }
      },
      );
  };

  setToken = (tokenId) => {
    localStorage.setItem('tkid', tokenId);
  }
}
