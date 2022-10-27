const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

const auth = require('./middleware/auth');

const router = require('express').Router();

const { postNewUser, login } = require('./controllers/users');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(requestLogger);

app.use((req, res, next) => {
  req.user = {
    _id: '631891ecb356df50d50a532e',
  };

  next();
});

router.post('/signup', postNewUser);

router.post('/signin', login);

app.use(auth);

app.use('/', usersRoute);

app.use('/', cardsRoute);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
