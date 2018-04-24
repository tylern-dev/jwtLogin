import axios from 'axios';
// import jwtDecode from 'jwt-decode';

export const saveToken = (token) => {
  localStorage.setItem('tkid', token);
};

export const readToken = () => localStorage.getItem('tkid');

export const isTokenExpired = (cb) => {
  axios({
    method: 'get',
    url: '/apiToken/verifyToken',
    headers: { Authorization: `Bearer ${readToken()}` },
  })
    .then(() => {
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
};

