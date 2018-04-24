export const passwordCheck = (password, pwCheck, cb) => {
  if (password === pwCheck) {
    cb(true);
  } else {
    cb(false);
  }
};

export const pwCheckPromiseTest = (password, pwCheck) => new Promise((resolve, reject) => {
  if (password === pwCheck) {
    resolve(true);
  } else {
    reject(Error('passwords don\'t match'));
  }
});

