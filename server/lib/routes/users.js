const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
    const query = {};
    if (req.query.username) query.username = req.query.username;
    User.find(query)
      .select('-password')
      .lean()
      .then(users => res.send(users))
      .catch(next);
  })
  .get('/current', (req, res, next) => {
    User.findById(req.user.id)
      .select('-password')
      .populate('gameCollection')
      .populate('friends', 'username')
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .select('-password')
      .populate('gameCollection')
      .populate('friends', 'username')
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    if (req.user.id !== req.params.id) {
      throw {
        code: 403,
        error: 'Unauthorized user'
      }; 
    } 
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select('-password')
      .populate('gameCollection')
      .populate('friends', 'username')
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    if (req.user.id !== req.params.id) {
      throw {
        code: 403,
        error: 'Unauthorized user'
      }; 
    }
    User.findByIdAndRemove(req.params.id)
      .select('-password')
      .then(removed => res.send(removed))
      .catch(next);   
  });

module.exports = router;