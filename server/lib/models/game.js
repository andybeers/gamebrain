const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  bggId: { type: String },
  thumbnail: { type: String },
  image: { type: String },
  yearPub: { type: Number },
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  playtimeMinutes: { type: Number }
});

module.exports = mongoose.model('Game', schema);