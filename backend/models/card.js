const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function validatorFunction(v) {
        return /https?:\/\/(www\.)?\S+\.com(\S+)?/i.test(v);
      },
      message: 'invalid url11',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Object,
    default: [],
  },
});

// cardSchema.path('name').validate(function (v) {
//   if (v.length < 2) {
//     throw new Error('<2');
//   }
//   return true;
// }, 'Name `{VALUE}` is not valid');

module.exports = mongoose.model('card', cardSchema);
