const assert = require('chai').assert;
const Game = require('../../lib/models/game'); 
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('Game model', () => {

  it('Validates game model', done => {
    const testGame = new Game({
      title: 'Test',
      bggId: 2067,
      thumbnail: 'imgur.svg',
      image: 'bigimgur.svg',
      description: 'once upon a time',
      yearPub: 2017,
      minPlayers: 2,
      maxPlayer: 15,
      playtimeMinutes: 322,
      publisher: 'Z-man Games',
      expansion: true
    });

    testGame.validate(err => {
      assert.isNotOk(err);
      done(err);
    });
  });

  it('Requires game title', done => {
    let badGame = new Game({
      bggId: 123
    });

    badGame.validate(err => {
      if(!err) done('Should require title');
      assert.isOk(err);
      done();
    });
  });

  it('Requires game title', done => {
    let badGame = new Game({
      title: 'zombie blitz football adventures'
    });

    badGame.validate(err => {
      if(!err) done('Should require bggId');
      assert.isOk(err);
      done();
    });
  });

});