const mongoose = require('mongoose');

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
      message: 'invalid url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Object,
    default: {},
  },
});

module.exports = mongoose.model('card', cardSchema);
