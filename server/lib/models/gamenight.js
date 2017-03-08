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
  rsvps: { type: Array },
  requests: { type: Array }
});

module.exports = mongoose.model('Gamenight', schema);