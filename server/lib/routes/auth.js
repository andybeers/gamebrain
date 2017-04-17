const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

router
  .get('/validate', ensureAuth, (req, res) => {
    res.send({ valid: true });
  })
  .post('/signup', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;

    if(!username || !password) {
      return next({
        code: 400,
        error: 'Username and password required'
      });
    }

    User.find({ username })
      .count()
      .then(count => {
        if (count > 0) throw { code: 400, error: `Username ${username} already exists`};
        const user = new User(req.body);
        user.generateHash(password);
        return user.save();
      })
      .then(user => token.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  })
  .post('/signin', bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    delete req.body.password;

    User.findOne({ username })
      .then(user => {
        if (!user || !user.compareHash(password)) {
          throw { code: 400, error: 'Invalid username or password' };
        }
        return token.sign(user);
      })
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router;