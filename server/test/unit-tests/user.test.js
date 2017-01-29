const assert = require('chai').assert;
const User = require('../../lib/models/user'); 
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('User model', () => {

  it('Validates user model', done => {
    let gameId = new mongoose.Types.ObjectId();
    const testUser = new User({
      username: 'testUser',
      password: 123,
      gamesColl: [gameId]
    });

    testUser.validate(err => {
      assert.isNotOk(err);
      done(err);
    });
  });

  it('Requires username', done => {
    let badUser = new User({
      password: 123
    });

    badUser.validate(err => {
      if(!err) done('Should require username');
      assert.isOk(err);
      done();
    });
  });

  it('Requires password', done => {
    let badUser = new User({
      username: 'testUser'
    });

    badUser.validate(err => {
      if(!err) done('Should require password');
      assert.isOk(err);
      done();
    });
  });

});