const router = require('express').Router();

const {
  updateUserDataVlidator,
  avatarValidator,
  userIdValidator,
} = require('../middleware/userValidators');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.get('/users/:userId', userIdValidator, getUserById);

router.patch('/users/me', updateUserDataVlidator, updateProfile);

router.patch('/users/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
