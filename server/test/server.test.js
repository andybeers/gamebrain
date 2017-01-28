const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');
const request = chai.request(app);

describe('It works', () => {

  it('Starts a server', done => {
    request
      .get('/')
      .then(res => {
        assert.equal(res.status, 200);
        done();
      })
      .catch(done);
  });

});