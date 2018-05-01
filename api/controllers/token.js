const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
exports.verifyToken = (req,res,next) => {
  const token = req.body.token || req.headers.authorization.split(" ")[1];
  // const token = req.body.token
  jwt.verify(token, process.env.JWT_SECRET,null, (err, decode)=> {
    if(err){
      res.status(401).json({message: 'Invalid Token'})
    }
    User.findById(decode.id)
      .then((user) => {
        console.log(user)
        res.status(200).json({message: 'Token OK'});
      })
      .catch(err => {
        res.status(401).json({message: 'User does not exist'});
      })
  })
}