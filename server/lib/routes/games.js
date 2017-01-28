const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
    Game.find()
      .lean()
      .then(games => res.send(games))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Game.findById(req.params.id)
      .lean()
      .then(game => res.send(game))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    new Game(req.body).save()
      .then(newGame => res.send(newGame))
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  });

module.exports = router;