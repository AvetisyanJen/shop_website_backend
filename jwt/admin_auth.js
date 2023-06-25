const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

function AdminAuthenticate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
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
  if (user.role === 1) {
    return next();
  }
  return res.sendStatus(403);
}

module.exports = { AdminAuthenticate};