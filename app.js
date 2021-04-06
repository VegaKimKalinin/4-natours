const express = require('express');
const fs = require('fs');
const AppError = require('./utils/appError');
const morgan = require('morgan');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const errorControler = require('./controllers/errorControler');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can\'t find ${req.originalUrl}`, 404);
  next(err);
});

app.use(errorControler);

module.exports = app;
