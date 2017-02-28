const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Gamenights CRUD routes', () => {

  const gamenightUser = {
    username: 'gamenightUser',
    password: 'hunter2'
  };
  const gamenightUser2 = {
    username: 'gamenightUser2',
    password: 'hunter3'
  };
  const testDate = new Date();
  const testGamenight = {
    name: 'testing',
    description: 'test test test',
    date: testDate,
    invites: [],
    rsvps: [{ game: { prop1: '1274y4645' }, userId: '48284746162' }, { game: { prop1: '41242jasdfkjh' }, userId: '48284746162' }],
    requests: [{ prop3: '127fdasf4y4645' }, { prop3: 'oiqwihglskdjg' }]
  };

  before('Logs in test users', done => {
    Promise.all([
      request
        .post('/api/auth/signup')
        .send(gamenightUser),
      request
        .post('/api/auth/signup')
        .send(gamenightUser2),
    ])
      .then(res => {
        gamenightUser.token = res[0].body.token;
        gamenightUser2.token = res[1].body.token;
        done();
      })
      .catch(done);
  });

  it('Requires valid token', done => {
    request
      .get('/api/gamenights')
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 403);
        assert.equal(err.response.body.error, 'Unauthorized, no token provided');
        done();
      });
  });

  it('POSTs a gamenight', done => {
    request
      .post('/api/gamenights')
      .set({ 'authorization': gamenightUser.token })
      .send(testGamenight)
      .then(res => {
        console.log('post reply:', res.body);
        testGamenight._id = res.body._id;
        testGamenight.__v = res.body.__v;
        testGamenight.host = res.body.host;
        testGamenight.date = res.body.date;
        testGamenight.invites = res.body.invites;
        assert.deepEqual(res.body, testGamenight);
        done();
      })
      .catch(done);
  });

  // it('GETs gamenight by id', done => {
  //   request
  //     .get(`/api/gamenights/${testGamenight._id}`)
  //     .set({ 'authorization': gamenightUser.token })
  //     .then(res => {
  //       assert.deepEqual(res.body, testGamenight);
  //       done();
  //     })
  //     .catch(done);
  // });

  it('Prevents non-hosts from deleting gamenight', done => {
    request
      .delete(`/api/gamenights/${testGamenight._id}`)
      .set({ 'authorization': gamenightUser2.token })
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 403);
        assert.equal(err.response.body.error, 'Unauthorized user');
        done();
      });
  });

  it('DELETEs a gamenight', done => {
    request
      .delete(`/api/gamenights/${testGamenight._id}`)
      .set({ 'authorization': gamenightUser.token })
      .then(res => {
        assert.deepEqual(res.body, testGamenight);
        done();
      })
      .catch(done);
  });

});