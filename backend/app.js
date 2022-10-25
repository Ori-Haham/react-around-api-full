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

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(requestLogger);

app.use((req, res, next) => {
  req.user = {
    _id: '631891ecb356df50d50a532e',
  };

  next();
});

app.use('/', usersRoute);
// app.use(auth);
app.use('/', cardsRoute);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
