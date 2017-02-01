const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const xmlParser = require('../xml-parser');

router
  .get('/search/:query', (req, res, next) => {
    const query = req.params.query;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame,boardgameexpansion`)
      .accept('xml')
      .parse(xmlParser)
      .then(bggResponse => res.send(bggResponse.body))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .accept('xml')
      .parse(xmlParser)
      .then(bggResponse => res.send(bggResponse.body))
      .catch(next);
  });

module.exports = router;