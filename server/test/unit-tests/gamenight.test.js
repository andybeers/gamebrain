const assert = require('chai').assert;
const Gamenight = require('../../lib/models/gamenight'); 
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('Gamenight model', () => {

  const testHost = new mongoose.Types.ObjectId();
  const testDate = new Date();
  const testGamenight = new Gamenight({
    name: 'testing',
    host: testHost,
    description: 'test test test',
    date: testDate
  });

  it('Validates game model', done => {
    testGamenight.validate(err => {
      assert.isNotOk(err);
      done(err);
    });
  });

  it('Requires name', done => {
    let badNight = new Gamenight({
      host: testHost,
      description: 'blip blip',
      date: testDate
    });

    badNight.validate(err => {
      if(!err) done('Should require name');
      assert.isOk(err);
      done();
    });
  });

  it('Requires host', done => {
    let badNight = new Gamenight({
      name: 'bad date',
      description: 'blip blip',
      date: testDate
    });

    badNight.validate(err => {
      if(!err) done('Should require host');
      assert.isOk(err);
      done();
    });
  });

  it('Requires date', done => {
    let badNight = new Gamenight({
      name: 'bad date',
      description: 'blip blip',
      host: testHost
    });

    badNight.validate(err => {
      if(!err) done('Should require date');
      assert.isOk(err);
      done();
    });
  });

});