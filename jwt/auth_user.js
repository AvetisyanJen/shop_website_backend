const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.Secret


function AuthenticateUserToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
   
   
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET,async (err, user) => {
      if (err) return res.sendStatus(403);
     
      req.user = user; 
      next();
    });
  }
 
  
  
module.exports={
    AuthenticateUserToken
}