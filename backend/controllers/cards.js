const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundErr');
const BadRequestError = require('../errors/BadRequestError');
const noPermissionError = require('../errors/noPermissionError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('No cards found');
      }
      res.send(cards);
    })

    .catch(next);
};

module.exports.postNewCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user.token })
    .then((card) => {
      try {
        res.send({ card });
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Validation error'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('No card with matching ID found');
      } else if (card.owner != req.user.token) {
        throw new noPermissionError(
          'Forbiden : you have no permission to delete this card'
        );
      }
      res.send({ card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.token } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('No card with matching ID found');
      }
      res.send({ card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.token } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('No card with matching ID found');
      }
      res.send({ card });
    })
    .catch(next);
};

