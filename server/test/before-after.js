const connection = require('../lib/setup-mongoose');
const db = require('./db');

before(db.drop());

after(() => connection.close());