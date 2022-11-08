const bcrypt = require('bcryptjs');
require('dotenv').config();
const {
  JWT_SECRET = `a2e26defa95b258d32e23b7ab99bffe67a46a7c9fa280e1cbabd9082f11865751343f7b2866d29c54c24353a94676ed49a495a51540395cfc48
707ce21461dfd`,
} = process.env;

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorHandler = require('../errors/errorHandler');
const NotFoundError = require('../errors/notFoundErr');
const unauthorizedError = require('../errors/unauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const conflictError = require('../errors/conflictError');

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
<<<<<<< HEAD
 	   next(new BadRequestError('Validation error'));
 	 } else if (err.name === 'MongoServerError') {
   	 next(new conflictError('This email already exist'));
	  } else {
 	   console.log(err);
    	next(err);
  }
=======
          next(new BadRequestError('Validation error'));
        } else if (err.name === 'MongoServerError') {
          next(new conflictError('This email already exist'));
        } else {
          console.log(err);
          next(err);
        }
>>>>>>> 2a43da9cc25ec1a690eead6feef77ec866445179
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
      const token = jwt.sign({ token: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
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

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError(`card doesn't exist`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Validation error'));
      } else {
        next(err);
      }
    });
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
