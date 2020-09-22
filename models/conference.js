//  Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Creating schema with necessary information
const conferenceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatLimit: {
    type: Number,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registeredVisitors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});

// Exporting event model
module.exports = mongoose.model('Conference', conferenceSchema);
