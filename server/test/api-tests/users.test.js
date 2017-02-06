const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Users CRUD routes', () => {

  const usersUser = {
    username: 'usersUser',
    password: 'hunter2',
    email: 'billy@yahoo.com'
  };

  before('Create users user', done => {
    request
      .post('/api/auth/signup')
      .send(usersUser)
      .then(res => {
        usersUser.token = res.body.token;
        done();
      })
      .catch(done);
  });

  it('Requires valid token', done => {
    request
      .get('/api/users')
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 403);
        assert.equal(err.response.body.error, 'Unauthorized, no token provided');
        done();
      });
  });

  it('Gets all users', done => {
    request
      .get('/api/users')
      .set({ 'authorization': usersUser.token })
      .then(res => {
        assert.equal(res.body.length, 4);
        assert.equal(res.body[3].username, 'usersUser');
        assert.isNotOk(res.body[0].password);
        usersUser._id = res.body[3]._id;
        done();
      })
      .catch(done);
  });

  it('GETs user by id', done => {
    request
      .get(`/api/users/${usersUser._id}`)
      .set({ 'authorization': usersUser.token })
      .then(res => {
        assert.equal(res.body.username, usersUser.username);
        assert.isNotOk(res.body.password);
        done();
      })
      .catch(done);
  });

});