// const assert = chai.assert;
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('User model', () => {

  it('Has valid user model', done => {
    const testUser = new User({
      name: testUser,
      password: 123
    });

    testUser.validate(err => {
      done(err);
    });

  });

});