const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Gamenights CRUD routes', () => {

  const testUser = {
    username: 'testUser',
    password: 'hunter2'
  };
  const testDate = new Date();
  const testGamenight = {
    name: 'testing',
    description: 'test test test',
    date: testDate,
    invites: []
  };

  before('Logs in a user', done => {
    request
      .post('/api/auth/signin')
      .send(testUser)
      .then(res => {
        testUser.token = res.body.token;
        done();
      })
      .catch(done);
  });


  it('POSTs a gamenight', done => {
    request
      .post('/api/gamenights')
      .set({ 'authorization': testUser.token })
      .send(testGamenight)
      .then(res => {
        testGamenight._id = res.body._id;
        testGamenight.__v = res.body.__v;
        testGamenight.host = res.body.host;
        testGamenight.date = res.body.date;
        assert.deepEqual(res.body, testGamenight);
        done();
      })
      .catch(done);
  });


});