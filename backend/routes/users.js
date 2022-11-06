const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  updateUserDataVlidator,
  avatarValidator,
} = require('../middleware/userValidators');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.patch('/users/me', updateUserDataVlidator, updateProfile);

router.patch('/users/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
