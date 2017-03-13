const assert = require('chai').assert;
const Gamenight = require('../../lib/models/gamenight'); 
const mongoose = require('mongoose');
mongoose.Promise = Promise;

describe('Gamenight model', () => {

  const testHost = new mongoose.Types.ObjectId();
  const testInvite = new mongoose.Types.ObjectId();
  const testDate = new Date();
  const testGamenight = new Gamenight({
    name: 'testing',
    host: testHost,
    description: 'test test test',
    date: testDate,
    invites: [testInvite],
    rsvps: [{ bggId: '1274y4645', title: 'zombie dog party' }, { bggId: '1274y4645', title: 'newspaper simulator' }],
    requests: [{ bggId: '23123124', title: 'pirate chow' }, { bggId: '9082309757', title: 'bridge builder' }]
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

  it('Enforces date type', done => {
    let badNight = new Gamenight({
      name: 'bad date2',
      description: 'blip blip',
      host: testHost,
      date: 'jan 5th, 1987'
    });

    assert.isNotOk(badNight.date);
    done();
  });

});