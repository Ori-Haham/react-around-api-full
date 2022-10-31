const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('No users found');
      }
      res.send(users);
    })

    .catch(next);
};

module.exports.postNewCard = (req, res) => {
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
      res.send({ err });
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('No card with matching ID found');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.token } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No card with matching ID found');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.token } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('No card with matching ID found');
    })
    .then((card) => res.send({ card }))
    .catch(next);
};
