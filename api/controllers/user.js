// require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/UserSchema');

exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      // user.find returns empty array if nothing is found
      if (user.length >= 1) {
        console.log('with email', user)
        return res.status(409).json({ message: 'Email already exists' })
      } else {
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName
          });
          user.save()
            .then(result => {
              console.log(result);

              const token = jwt.sign({
                id: result._id,
                name: result.firstName,
                email: result.email
              }, process.env.JWT_SECRET);

              res.status(201).json({ message: 'User created', ssid: token });
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({ error: err })
            })
        })
      }
    })
}

exports.user_login = (req, res, next) => {
  // var authHeader = req.headers.authorization.split(" ")[1]
  // // jwt.verify(authHeader, process.env.JWT_SECRET)

  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Invalid Username or Password" })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Invalid Username or Password" });
        }
        if (result) {
          jwt.sign({ _id: user._id, email: user.email, role:user.role }, process.env.JWT_SECRET,  (err, token) => {
            return res.status(200).json({
              message: 'Auth Successful',
              ssid: token
            });
          });
        } else {
          res.status(401).json({ message: 'Invalid Username or Password' })
        }
      })


    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.users_get_all = (req, res, next) => {
  User.find()
    .then(result => {
      res.status(200).json(result.map(name => name.email))
    }).catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

