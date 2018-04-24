/* This file is for doing the auth check middleware on the routes. */
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(" ")[1]
    console.log('token--->',token)
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.userDecode = decode
    next()
  }
  catch (error) {
    return res.status(401).json({message: "auth failed"})
  }
}