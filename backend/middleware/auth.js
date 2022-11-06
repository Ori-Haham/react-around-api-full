const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
  JWT_SECRET = `a2e26defa95b258d32e23b7ab99bffe67a46a7c9fa280e1cbabd9082f11865751343f7b2866d29c54c24353a94676ed49a495a51540395cfc48
707ce21461dfd`,
} = process.env;
const unauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new unauthorizedError('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    throw new unauthorizedError('Authorization Required');
  }

  req.user = payload;

  next();
};
