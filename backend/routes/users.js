const router = require('express').Router();
const {
  getUsers,
  getUserById,
  postNewUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

router.post('/signup', postNewUser);

router.post('/signin', login);

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
