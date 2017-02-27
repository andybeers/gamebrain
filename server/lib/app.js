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

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if(req.headers['x-forwarded-proto'] === 'https') next();
    else res.redirect(`https://${req.hostname}${req.url}`);
  });
}

app.use(express.static('./public'));
app.use('/api/auth', auth);
app.use('/api/gamenights', ensureAuth, gamenights);
app.use('/api/games', ensureAuth, games);
app.use('/api/users', ensureAuth, users);

app.use(errorHandler);

module.exports = app;