const express = require('express');
const app = express();
const morgan = require('morgan');
const games = require('./routes/games');
const gamenights = require('./routes/gamenights');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));

app.use('/api/gamenights', gamenights);
app.use('/api/games', games);

app.use(errorHandler);

module.exports = app;