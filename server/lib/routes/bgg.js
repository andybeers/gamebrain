const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const superagent = require('superagent');
const xmlParser = require('../xml-parser');

router
  .get('/search/:query', (req, res, next) => {
    const query = req.params.query;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi/search?search=${query}`)
      .accept('xml')
      .parse(xmlParser)
      .then(bggResponse => res.send(bggResponse.body))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    superagent
      .get(`https://www.boardgamegeek.com/xmlapi/boardgame/${id}`)
      .accept('xml')
      .parse(xmlParser)
      .then(bggResponse => res.send(bggResponse.body))
      .catch(next);
  });

module.exports = router;