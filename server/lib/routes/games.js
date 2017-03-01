const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const bodyParser = require('body-parser').json();
const superagent = require('superagent');
const xmlParser = require('../xml-parser');

router
  .get('/', (req, res, next) => {
    const query = {};
    if (req.query.search) query.$text = {$search: req.query.search};
    if (req.query.bggId) query.bggId = req.query.bggId;
    Game.find(query)
      .lean()
      .then(games => res.send(games))
      .catch(next);
  })
  .get('/bgg/search/:query', (req, res, next) => {
    const query = req.params.query;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame,boardgameexpansion`)
      .accept('xml')
      .parse(xmlParser.parseXML)
      .then(bggResponse => {
        const results = xmlParser.formatBggSearch(bggResponse.body);
        res.send(results);
      })
      .catch(next);
  })
  .get('/bgg/:id', (req, res, next) => {
    const id = req.params.id;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .accept('xml')
      .parse(xmlParser.parseXML)
      .then(bggResponse => {
        const game = xmlParser.formatBggData(bggResponse.body);
        res.send(game);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Game.findById(req.params.id)
      .lean()
      .then(game => res.send(game))
      .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
    if(!req.body.bggId) throw { code: 400, message: 'Game ID required' };
    const id = req.body.bggId;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .accept('xml')
      .parse(xmlParser.parseXML)
      .then(bggResponse => {
        const game = xmlParser.formatBggData(bggResponse.body);
        return new Game(game).save();
      })
      .then(newGame => res.send(newGame))
      .catch(next);
  });
  
  // No users should be able to edit or delete games, as of yet.
  // .put('/:id', bodyParser, (req, res, next) => {
  //   Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
  //     .then(updated => res.send(updated))
  //     .catch(next);
  // })
  // .delete('/:id', (req, res, next) => {
  //   Game.findByIdAndRemove(req.params.id)
  //     .then(removed => res.send(removed))
  //     .catch(next);
  // });

module.exports = router;