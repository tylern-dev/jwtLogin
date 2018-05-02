const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

// this will verify the token sent from the client and run it agains a user in the db
exports.verifyToken = (req,res,next) => {

  const token = req.body.token || req.headers.authorization.split(" ")[1];
  console.log('from server',token)

  if(!token || token === undefined){
    res.status(401).json({message: 'Invalid Token :('})
  } else {
    jwt.verify(token, process.env.JWT_SECRET,null, (err, decode)=> {
      console.log('decode', decode)
      if(err){
        res.status(401).json({message: 'Invalid Token'})
      } else {
        User.findById(decode.id)
          .then((user) => {
            console.log(user)
            res.status(200).json({message: 'Token OK'});
          })
          .catch(err => {
            res.status(401).json({message: 'User does not exist'});
          })
      }

    })

  }
}