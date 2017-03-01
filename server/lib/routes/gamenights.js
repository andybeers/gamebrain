const express = require('express');
const router = express.Router();
const Gamenight = require('../models/gamenight');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
    const query = {};
    if (req.query.host) query.host = req.user.id;
    if (req.query.invited) query.invites = req.user.id;
    Gamenight.find(query)
      .lean()
      .then(gamenights => res.send(gamenights))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Gamenight.findById(req.params.id)
      .populate({
        path: 'invites',
        select: 'username gameCollection',
        populate: {path: 'gameCollection'}
      })
      .populate({
        path: 'host',
        select: 'username gameCollection',
        populate: {path: 'gameCollection'}
      })
      .lean()
      .then(gamenight => res.send(gamenight))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    req.body.host = req.user.id;
    new Gamenight(req.body).save()
      .then(newGamenight => res.send(newGamenight))
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    Gamenight.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({
        path: 'invites',
        select: 'username gameCollection',
        populate: {path: 'gameCollection'}
      })
      .populate('host', 'username gameCollection')
      .lean()
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Gamenight.findById(req.params.id)
      .then(gamenight => {
        if (req.user.id != gamenight.host) {
          throw {
            code: 403,
            error: 'Unauthorized user'
          }; 
        }
        return Gamenight.findByIdAndRemove(req.params.id);
      })
      .then(removed => res.send(removed))
      .catch(next);   
  });

module.exports = router;