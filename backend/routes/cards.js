const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const router = require('express').Router();
const {
  getCards,
  postNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateUrl),
    }),
  }),
  postNewCard
);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/likes/:cardId', likeCard);

router.delete('/cards/likes/:cardId', dislikeCard);

module.exports = router;
