import axios from 'axios';

export const createUserAPI = (user, cb) => {
  console.log(user);
  axios.post('/apiUser/signup', user)
    .then((response) => {
      // call the response back to the signup function
      cb(response);
      console.log('user added');
    })
    .catch((err) => {
      cb(err.response);
      // console.log('error adding user', err.response);
    });
};


export const signInUser = (user, cb) => {
  console.log(user);
  axios.post('/apiUser/login', user)
    .then((response) => {
      cb(response);
    })
    .catch((err) => {
      cb(err.response);
    });
};
