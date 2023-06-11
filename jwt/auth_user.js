const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.Secret

// function AuthenticateUserToken(req, res, next) {
//     const { authorization } = req.headers;
//     const token = authorization?.split(' ')[1];
//     console.log(token,"olaaaaaaaaaa");
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         if( user.rol===0 && is_verified===1){
//             next()
//         }
   
//     })
// }
function AuthenticateUserToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    console.log(token, "olaaaaaaaaaa");
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user; // Save the user object to the request for later use
      next();
    });
  }
  
module.exports={
    AuthenticateUserToken
}