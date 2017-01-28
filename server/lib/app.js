const express = require('express');
const app = express();
const morgan = require('morgan');
const games = require('./routes/games');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

app.use('/api/games', games);

module.exports = app;