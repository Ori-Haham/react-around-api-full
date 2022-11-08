const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  updateUserDataVlidator,
  avatarValidator,
<<<<<<< HEAD
  userIdValidator,
=======
  userIdValidator
>>>>>>> 88d729aa1bea0663bc2c193a3052c12e593376c1
} = require('../middleware/userValidators');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
<<<<<<< HEAD
  getUserById,
=======
  getUserById
>>>>>>> 88d729aa1bea0663bc2c193a3052c12e593376c1
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.get('/users/:userId', userIdValidator, getUserById);

router.patch('/users/me', updateUserDataVlidator, updateProfile);

router.patch('/users/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
