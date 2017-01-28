const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
    Game.find()
      .lean()
      .then(games => {
        res.send(games);
      })
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    new Game(req.body).save()
      .then(newGame => res.send(newGame))
      .catch(next);
  });

module.exports = router;