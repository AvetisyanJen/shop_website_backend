const sendMail = require('../transporter/mailer');
const { User } = require('../models')
const bcrypt = require("bcrypt");
const { generateAccessToken } = require('../jwt/genarate');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET
const { validationResult, body } = require("express-validator");




class UserController {


  async registerUser(req, res) {
   
    try {
      const port = process.env.PORT || 3000; 
      const { email, userName, password } = req.body;
      const errors = validationResult(req);
  console.log(req.body)
    
      
      if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ error: errorMessage });
      }

       const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(409).json({ error: "A user with this email already exists." });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      await User.create({ email, userName, password: hashedPassword});
  
      const token = generateAccessToken(email);
      sendMail(email, `<h2>hi dear  ${userName}</h2>,
      <a href='http://localhost:${port}/user/verify?token=${token}'>verify email</a>` );
     
      return res.json({ status: 'User Created' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

  }
  
  //http://localhost:${port}/user/verify?token=${token}


  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password." });
    }
  
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email is not correct" });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    } else if (user.is_verified == 1) {
      const token = generateAccessToken(email, user.userName, user.id, user.role, user.is_verified);
      res.json({ status: "Logged in", user, jwt: token });
    }else if(user.is_verified === 0) {
      return res.status(400).json({message:"You Need Verification!"});
    }
  }
  


  async  confirmEmail(req, res) {
    try {
      const token = req.query.token;
      const decoded = jwt.verify(token, SECRET);
      await User.update({ is_verified: 1 }, { where: { email: decoded.email } });
      res.status(200).json({ message: "Verified" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  


}
module.exports = {
  UserController: new UserController(),
};

