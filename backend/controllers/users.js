const bcrypt = require('bcryptjs');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorHandler = require('../errors/errorHandler');
const NotFoundError = require('../errors/notFoundErr');

module.exports.postNewUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => res.send({ user }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ token: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
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

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send({ data: user }))
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

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No user found');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

