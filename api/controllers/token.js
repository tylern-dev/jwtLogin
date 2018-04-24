const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET,null, (err, decode)=> {
    if(err){
      res.status(401).json({message: 'Invalid Token'})
    } else {
      req.userDecode = decode
      res.status(200).json({message:'Token OK'})
    }
  })
  next();
}