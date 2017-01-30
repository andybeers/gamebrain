const express = require('express');
const app = express();
const morgan = require('morgan');
const auth = require('./routes/auth');
const games = require('./routes/games');
const gamenights = require('./routes/gamenights');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));

app.use('/api/auth', auth);
app.use('/api/gamenights', ensureAuth, gamenights);
app.use('/api/games', ensureAuth, games);

app.use(errorHandler);

module.exports = app;