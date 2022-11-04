const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

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
