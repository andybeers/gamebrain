const parseString = require('xml2js').parseString;

function xmlParser(res, next) {
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
}

module.exports = xmlParser;