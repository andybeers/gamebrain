const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: { type: String },
  date: { type: Date, required: true },
  invites: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  rsvps: [{
    _id: false,
    gameId: { type: String },
    userId: { type: String }
  }],
  requests: { type: Array }
});

module.exports = mongoose.model('Gamenight', schema);