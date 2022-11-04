const router = require('express').Router();
<<<<<<< HEAD
const { userDataValidator } = require('../middleware/userValidators');
=======
const { celebrate, Joi, Segments } = require('celebrate');
>>>>>>> de83f149635fad1b97e09d8813d2ac13d9ade748

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
console.log(getUsers,
  getUser,
  updateProfile,
  updateAvatar);
router.get('/users', getUsers);

router.get('/users/me', getUser);
<<<<<<< HEAD

// router.get('/users/:id', getUserById);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile
);

router.patch(
=======

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile
);

router.patch(
>>>>>>> de83f149635fad1b97e09d8813d2ac13d9ade748
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (validator.isURL(value)) {
            return value;
          }
          return helpers.error('string.uri');
        }),
    }),
  }),
  updateAvatar
);

module.exports = router;
