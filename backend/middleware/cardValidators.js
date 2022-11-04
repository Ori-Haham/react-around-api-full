const { celebrate, Joi, Segments } = require('celebrate');

const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
};

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
<<<<<<< HEAD
    cardId: Joi.string().hex().min(24).max(24).required(),
=======
    cardId: Joi.string().hex().length(24).required(),
>>>>>>> de83f149635fad1b97e09d8813d2ac13d9ade748
  }),
});

module.exports = {
  cardValidator,
  cardIdValidator,
};
