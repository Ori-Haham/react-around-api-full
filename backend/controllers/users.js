const User = require('../models/user');
const errorHandler = require('../error/errorHandler');

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

module.exports.postNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }, { runValidators: true })
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
