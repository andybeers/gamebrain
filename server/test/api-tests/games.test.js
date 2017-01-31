const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Games CRUD routes', () => {

  const gamesUser = {
    username: 'gamesUser',
    password: 'hunter2'
  };

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

  before('Create games user', done => {
    request
      .post('/api/auth/signup')
      .send(gamesUser)
      .then(res => {
        gamesUser.token = res.body.token;
        done();
      })
      .catch(done);
  });

  it('Requires valid token', done => {
    request
      .get('/api/games')
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 403);
        assert.equal(err.response.body.error, 'Unauthorized, no token provided');
        done();
      });
  });

  it('POSTs a game', done => {
    request
      .post('/api/games')
      .set({ 'authorization': gamesUser.token })
      .send(testGame)
      .then(res => {
        testGame._id = res.body._id;
        testGame.__v = res.body.__v;
        assert.deepEqual(res.body, testGame);
        done();
      })
      .catch(done);
  });

  it('GETs all games', done => {
    request
      .get('/api/games')
      .set({ 'authorization': gamesUser.token })
      .then(res => {
        assert.equal(res.body.length, 1);
        assert.deepEqual(res.body[0], testGame);
        done();
      })
      .catch(done);
  });

  it('GETs game by id', done => {
    request
      .get(`/api/games/${testGame._id}`)
      .set({ 'authorization': gamesUser.token })
      .then(res => {
        assert.deepEqual(res.body, testGame);
        done();
      })
      .catch(done);
  });
  
  // No user should be able to edit or delete games, as of yet.
  // it('PUTs updates into game', done => {
  //   request
  //     .put(`/api/games/${testGame._id}`)
  //     .set({ 'authorization': gamesUser.token })
  //     .send({ title: 'CHANGED TITLE' })
  //     .then(res => {
  //       testGame.title = 'CHANGED TITLE';
  //       assert.deepEqual(res.body, testGame);
  //       done();
  //     })
  //     .catch(done);
  // });

  // it('DELETEs a game', done => {
  //   request
  //     .delete(`/api/games/${testGame._id}`)
  //     .set({ 'authorization': gamesUser.token })
  //     .then(res => {
  //       assert.deepEqual(res.body, testGame);
  //       done();
  //     })
  //     .catch(done);
  // });

});