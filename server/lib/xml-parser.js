const parseString = require('xml2js').parseString;
const htmlEntities = require('html-entities').AllHtmlEntities;
const entities = new htmlEntities();

const xmlParser = {

  // parseXML based on Todd Geist's https://github.com/toddgeist/superagent-xml2jsparser
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

  //Format raw BGG API response to limit nesting and only grab what we need
  formatBggData(bggGame) {
    const formatted = {};
    formatted.bggId = bggGame.items.item[0].$.id;
    formatted.title = bggGame.items.item[0].name[0].$.value;
    if (bggGame.items.item[0].description) {
      const description = bggGame.items.item[0].description[0];
      //ensure we properly decode char codes
      formatted.description = entities.decode(description);
    }
    if (bggGame.items.item[0].thumbnail) formatted.thumbnail = bggGame.items.item[0].thumbnail[0].slice(2);
    if (bggGame.items.item[0].image) formatted.image = bggGame.items.item[0].image[0].slice(2);
    if (bggGame.items.item[0].yearpublished) formatted.yearPub = bggGame.items.item[0].yearpublished[0].$.value;
    if (bggGame.items.item[0].minplayers) formatted.minPlayers = bggGame.items.item[0].minplayers[0].$.value;
    if (bggGame.items.item[0].maxplayers) formatted.maxPlayers = bggGame.items.item[0].maxplayers[0].$.value;
    if (bggGame.items.item[0].playingtime) formatted.playtimeMinutes = bggGame.items.item[0].playingtime[0].$.value;
    formatted.expansion = bggGame.items.item[0].$.type === 'boardgameexpansion' ? true : false;
    //Only grab first value from 'publisher' array (should be primary, but not sure)
    const publisher = bggGame.items.item[0].link.filter(obj => obj.$.type === 'boardgamepublisher');
    if (publisher.length > 0) formatted.publisher = publisher[0].$.value;
    return formatted;
  },

  //Format raw BGG API search response to limit nesting
  formatBggSearch(bggSearch) {
    if (bggSearch.items.$.total === '0') return [];
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