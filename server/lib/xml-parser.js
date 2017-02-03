const parseString = require('xml2js').parseString;

const xmlParser = {

  parseXML(res, next) {
    res.text = '';
    res.setEncoding('utf8');
    res.on('data', chunk => res.text += chunk);
    res.on('end', () => {
      try {
        parseString(res.text, next);
      } catch (err) {
        next(err);
      }
    });
  },

  formatBggData(bggGame) {
    const formatted = {};
    formatted.bggId = bggGame.items.item[0].$.id;
    formatted.title = bggGame.items.item[0].name[0].$.value;
    formatted.thumbnail = bggGame.items.item[0].thumbnail[0].slice(2);
    formatted.image = bggGame.items.item[0].image[0].slice(2);
    formatted.yearPub = bggGame.items.item[0].yearpublished[0].$.value;
    formatted.minPlayers = bggGame.items.item[0].minplayers[0].$.value;
    formatted.maxPlayers = bggGame.items.item[0].maxplayers[0].$.value;
    formatted.playtimeMinutes = bggGame.items.item[0].playingtime[0].$.value;
    formatted.expansion = bggGame.items.item[0].$.type === 'boardgameexpansion' ? true : false;
    formatted.publisher = bggGame.items.item[0].link.filter(obj => obj.$.type === 'boardgamepublisher')[0].$.value;
    return formatted;
  },

  formatBggSearch(bggSearch) {
    return bggSearch.items.item.map(result => {
      const game = {};
      game.bggId = result.$.id;
      game.title = result.name[0].$.value;
      game.yearPub = result.yearpublished[0].$.value;
      return game;
    });

  }

};

module.exports = xmlParser;