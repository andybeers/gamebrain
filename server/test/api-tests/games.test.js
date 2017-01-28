const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Games CRUD routes', () => {

  const testGame = {
    title: 'Test',
    bggId: '2067',
    thumbnail: 'imgur.svg',
    image: 'bigimgur.svg',
    yearPub: 2017,
    minPlayers: 2,
    maxPlayers: 15,
    playtimeMinutes: 322
  };

  it('POSTs a game', done => {
    request
      .post('/api/games')
      .send(testGame)
      .then(res => {
        testGame._id = res.body._id;
        testGame.__v = res.body.__v;
        assert.deepEqual(res.body, testGame);
        done();
      })
      .catch(done);
  });

  it('Gets all games', done => {
    request
      .get('/api/games')
      .then(res => {
        assert.equal(res.body.length, 1);
        assert.deepEqual(res.body[0], testGame);
        done();
      })
      .catch(done);
  });

  it('Gets game by id', done => {
    request
      .get(`/api/games/${testGame._id}`)
      .then(res => {
        assert.deepEqual(res.body, testGame);
        done();
      })
      .catch(done);
  });

});