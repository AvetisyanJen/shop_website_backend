const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET

function generateAccessToken(email,userName,id,role,is_verified) {

    return jwt.sign({email,userName,id,role,is_verified}, SECRET, { expiresIn: '36000s' });
}


module.exports={generateAccessToken}