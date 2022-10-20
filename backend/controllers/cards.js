const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundErr');
const errorHandler = require('../error/errorHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      res.send('ori');
    });
};

module.exports.postNewCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      errorHandler(err, req, res);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('No user with matching ID found');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No card with matching ID found');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No card with matching ID found');
      }
      res.send({ data: user });
    })
    .catch(next);
};
