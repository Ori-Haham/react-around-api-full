const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const { celebrate, Joi, errors, Segments } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const auth = require('./middleware/auth');

const { userCredentialsValidator } = require('./middleware/userValidators');
const { postNewUser, login } = require('./controllers/users');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(cors());
app.options('*', cors());

console.log(1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', userCredentialsValidator, postNewUser);

app.post('/signin', userCredentialsValidator, login);

console.log(2);
app.use(auth);

app.use('/', usersRoute);
console.log(3);
app.use('/', cardsRoute);

app.use(errorLogger);

app.use(errors());
console.log(4);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});
console.log(5);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
