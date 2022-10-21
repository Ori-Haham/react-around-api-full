const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

app.use((req, res, next) => {
  req.user = {
    _id: '631891ecb356df50d50a532e',
  };

  next();
});

app.use('/', cardsRoute);
app.use('/', usersRoute);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
