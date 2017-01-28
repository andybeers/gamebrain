const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/gameshelf';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ', dbURI);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection closed');
});

process.on('SIGINT', () => {
  mongoose.connection.close( () => {
    console.log('Mongoose default connection closed through app termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;