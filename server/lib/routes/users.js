const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
    User.find()
      .lean()
      .select('-password')
      .then(users => res.send(users))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .lean()
      .select('-password')
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