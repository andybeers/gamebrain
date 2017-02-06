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
    if (bggGame.items.item[0].description) formatted.description = bggGame.items.item[0].description[0];
    if (bggGame.items.item[0].thumbnail) formatted.thumbnail = bggGame.items.item[0].thumbnail[0].slice(2);
    if (bggGame.items.item[0].image) formatted.image = bggGame.items.item[0].image[0].slice(2);
    if (bggGame.items.item[0].yearpublished) formatted.yearPub = bggGame.items.item[0].yearpublished[0].$.value;
    if (bggGame.items.item[0].minplayers) formatted.minPlayers = bggGame.items.item[0].minplayers[0].$.value;
    if (bggGame.items.item[0].maxplayers) formatted.maxPlayers = bggGame.items.item[0].maxplayers[0].$.value;
    if (bggGame.items.item[0].playingtime) formatted.playtimeMinutes = bggGame.items.item[0].playingtime[0].$.value;
    formatted.expansion = bggGame.items.item[0].$.type === 'boardgameexpansion' ? true : false;
    const publisher = bggGame.items.item[0].link.filter(obj => obj.$.type === 'boardgamepublisher');
    if (publisher.length > 0) formatted.publisher = publisher[0].$.value;
    return formatted;
  },

  formatBggSearch(bggSearch) {
    if (bggSearch.items.$.total === 0) return [];
    return bggSearch.items.item.map(result => {
      const game = {};
      game.bggId = result.$.id;
      game.expansion = result.$.type === 'boardgameexpansion' ? true : false;
      if (result.name) game.title = result.name[0].$.value;
      if (result.yearpublished) game.yearPub = result.yearpublished[0].$.value;
      return game;
    });
  }

};

module.exports = xmlParser;