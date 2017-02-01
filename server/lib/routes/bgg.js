const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const superagent = require('superagent');
const xmlParser = require('xml2js').parseString;

router
  .get('/search/:query', (req, res, next) => {
    const query = req.params.query;
    superagent
      .get(`http://www.boardgamegeek.com/xmlapi/search?search=${query}`)
      .accept('xml')
      .then(response => {
        xmlParser(response.text, {explicitArray: false}, (err, result) => {
          if (err) {
            console.log('i am the err: ', err);
            throw err;
          }
          console.log('i am result: ', result);
          res.send(result);
        });
      })
      .catch(next);
  });


module.exports = router;