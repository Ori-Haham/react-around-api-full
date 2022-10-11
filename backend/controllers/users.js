const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorHandler = require('../error/errorHandler');

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
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      const token = jwt.sign({ token: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      // we return the token
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};
