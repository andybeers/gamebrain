const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Games CRUD routes', () => {

  it('Starts empty', done => {
    request
      .get('/api/games')
      .then(res => {
        assert.isArray(res.body);
        assert.equal(res.body.length, 0);
        done();
      })
      .catch(done);
  });

});