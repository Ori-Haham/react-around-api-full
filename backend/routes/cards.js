const router = require('express').Router();
const {
  getCards,
  postNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  cardValidator,
  cardIdValidator,
} = require('../middleware/cardValidators');

router.get('/cards', getCards);

router.post('/cards', cardValidator, postNewCard);

router.delete('/cards/:cardId', cardIdValidator, deleteCard);

router.put('/cards/:cardId/likes', cardIdValidator, likeCard);

router.delete('/cards/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
