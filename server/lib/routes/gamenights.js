const express = require('express');
const router = express.Router();
const Gamenight = require('../models/gamenight');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
    Gamenight.find()
      .lean()
      .then(gamenights => res.send(gamenights))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Gamenight.findById(req.params.id)
      .lean()
      .then(gamenight => res.send(gamenight))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    new Gamenight(req.body).save()
      .then(newGamenight => res.send(newGamenight))
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    Gamenight.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Gamenight.findByIdAndRemove(req.params.id)
      .then(removed => res.send(removed))
      .catch(next);
  });


module.exports = router;