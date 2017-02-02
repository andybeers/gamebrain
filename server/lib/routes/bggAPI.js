const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const xmlParser = require('../xml-parser');

function formatBggData(bggGame) {
  const formatted = {};
  formatted.bggId = bggGame.item[0].$.id;
  formatted.title = bggGame.item[0].name[0].$.value;
  formatted.thumbnail = bggGame.item[0].thumbnail[0].slice(2);
  formatted.image = bggGame.item[0].image[0].slice(2);
  formatted.yearPub = bggGame.item[0].yearpublished[0].$.value;
  formatted.minPlayers = bggGame.item[0].minplayers[0].$.value;
  formatted.maxPlayers = bggGame.item[0].maxplayers[0].$.value;
  formatted.playtimeMinutes = bggGame.item[0].playingtime[0].$.value;
  formatted.expansion = bggGame.item[0].$.type === 'boardgameexpansion' ? true : false;
  formatted.publisher = bggGame.item[0].link.filter(obj => obj.$.type === 'boardgamepublisher')[0];
  return formatted;
}

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
      .then(bggResponse => {
        const game = formatBggData(bggResponse.body);
        res.send(game);
      })
      .catch(next);
  });

module.exports = router;