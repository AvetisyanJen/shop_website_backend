const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

function AdminAuthenticate(req, res, next) {
  const { authorization } = req.headers?.split(' ')[1];;
  const token = authorization
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    return checkAdminRole(req, res, next);
  });
}

function checkAdminRole(req, res, next) {
  const { user } = req;
  if (user.role === 1 && user.userName === 'Admin') {
    return next();
  }
  return res.sendStatus(403);
}

module.exports = { AdminAuthenticate};