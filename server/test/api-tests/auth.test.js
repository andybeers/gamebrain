const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('User authorization routes', () => {

  const testUser = {
    username: 'testUser',
    password: 'hunter2',
    email: 'billy@yahoo.com'
  };

  let testUserToken = '';

  function badRequest(url, user, error, done) {
    request
      .post(url)
      .send(user)
      .then(() => done('Status should not be 200'))
      .catch(res => {
        assert.equal(res.status, 400);
        assert.equal(res.response.body.error, error);
        done();
      })
      .catch(done);
  }

  it('Requires username for signup', done => {
    badRequest('/api/auth/signup', { password: 'hunter2', email: 'billy@yahoo.com' }, 'Username and password required', done); 
  });

  it('Requires password for signup', done => {
    badRequest('/api/auth/signup', { username: 'badUser', email: 'billy@yahoo.com' }, 'Username and password required', done); 
  });

  it('Requires username for signin', done => {
    badRequest('/api/auth/signin', { password: 'hunter2', email: 'billy@yahoo.com' }, 'Invalid username or password', done); 
  });

  it('Requires password for signin', done => {
    badRequest('/api/auth/signin', { username: 'badUser', email: 'billy@yahoo.com' }, 'Invalid username or password', done); 
  });

  it('Signs a user up', done => {
    request
      .post('/api/auth/signup')
      .send(testUser)
      .then(res => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.token);
        testUserToken = res.body.token;
        done();
      })
      .catch(done);
  });

  it('Signs a user in', done => {
    request
      .post('/api/auth/signin')
      .send(testUser)
      .then(res => {
        assert.equal(res.status, 200);
        assert.equal(res.body.token, testUserToken);
        done();
      })
      .catch(done);
  });

  it('Rejects bad password', done => {
    request
      .post('/api/auth/signin')
      .send({ username: 'testUser', password: 'wrongPW', email: 'billy@yahoo.com' })
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 400);
        assert.equal(err.response.body.error, 'Invalid username or password');
        done();
      });
  });

  it('Rejects bad username in signin', done => {
    request
      .post('/api/auth/signin')
      .send({ username: 'does not exist', password: 'hunter2', email: 'billy@yahoo.com' })
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 400);
        assert.equal(err.response.body.error, 'Invalid username or password');
        done();
      });
  });

  it('Rejects username that already exists in signup', done => {
    request
      .post('/api/auth/signup')
      .send(testUser)
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 400);
        assert.equal(err.response.body.error, 'Username testUser already exists');
        done();
      });
  });

  it('Validates good tokens', done => {
    request
      .get('/api/auth/validate')
      .set({ 'authorization': testUserToken })
      .then(res => {
        assert.equal(res.body.valid, true);
        done();
      })
      .catch(done);
  });

  it('Invalidates bad tokens', done => {
    request
      .get('/api/auth/validate')
      .set({ 'authorization': 'aslkj2141gdg' })
      .then(() => {
        done('Should not be status 200');
      })
      .catch(err => {
        assert.equal(err.status, 403);
        assert.equal(err.response.body.error, 'Unauthorized, bad token');
        done();
      });
  });

});