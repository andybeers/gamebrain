const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')();
const auth = require('./routes/auth');
const games = require('./routes/games');
const gamenights = require('./routes/gamenights');
const users = require('./routes/users');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use(cors);

app.use('/api/auth', auth);
app.use('/api/gamenights', ensureAuth, gamenights);
app.use('/api/games', ensureAuth, games);
app.use('/api/users', ensureAuth, users);

app.use(errorHandler);

module.exports = app;