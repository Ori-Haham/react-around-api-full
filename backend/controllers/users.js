const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorHandler = require('../errors/errorHandler');
const NotFoundError = require('../errors/notFoundErr');
const unauthorizedError = require('../errors/unauthorizedError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.postNewUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    })
      .then((user) => {
        const { password, ...userObj } = user._doc;
        res.send({ userObj });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Validation error'));
        } else {
          next(err);
        }
      })
  );
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new unauthorizedError('Invalid email or password');
      }
      const token = jwt.sign({ token: user._id }, jwtSecretKey, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  if (!req.user) {
    throw new NotFoundError('No users found');
  }
  const userId = req.user.token;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('No users found');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('No users found');
    })
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user.token, { name, about }, { new: true })
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.token, { avatar }, { new: true })
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      next(err);
    });
};
