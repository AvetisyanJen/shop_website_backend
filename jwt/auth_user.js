const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.Secret
const {Cart}=require("../models")

function AuthenticateUserToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const {id}=req.params
    console.log(token, "olaaaaaaaaaa");
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET,async (err, user) => {
      if (err) return res.sendStatus(403);
     
      req.user = user; // Save the user object to the request for later use
      next();
    });
  }
// function AuthenticateUserToken(req, res, next) {
// try {
//   const { authorization } = req.headers;
//      const token = authorization?.split(' ')[1];
//   const {id} = req.params;
//   console.log(id,'req')

//   if (!token) {
//     res.status(401).json({ message: "Not Allowed" });
//     return;
//   }

//   jwt.verify(token, SECRET, async(err, user) => {
//     if (err) {
//       res.status(403).json({ message: "Access is forbidden" });
//       return;
//     }

//     if (user.role !== 0) {
//       res.status(403).json({ message: "Access is forbidden" });
//       return;
//     }

    // Check if the token belongs to the correct user (optional)
    // const getCart = await Cart.findOne({where:{userId:id}});
    // console.log(getCart,'g');
    
    // if (user.id !== getCart.userId) {
    //   res.status(403).json({ message: "You don't have rights" });
    //   return;
    // }

//     next();
//   });
// } catch {
//   res.status(500).json({ message: "Server Problem" });
// }
// }    
  
  
module.exports={
    AuthenticateUserToken
}