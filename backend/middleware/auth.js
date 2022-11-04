const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET;
const unauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new unauthorizedError('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtSecretKey);
  } catch (err) {
    console.log(err);
    throw new unauthorizedError('Authorization Required');
  }

  req.user = payload;

  next();
};
