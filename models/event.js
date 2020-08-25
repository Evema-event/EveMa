// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema with necessary information
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
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
  venue: {
    type: String,
    required: true,
  },
  registrationLastdate: {
    type: Date,
    required: true,
  },
  registeredUsers: [mongoose.Schema.Types.ObjectId],
  registeredStalls: [mongoose.Schema.Types.ObjectId],
  registeredConferences: [mongoose.Schema.Types.ObjectId],
});

// Exporting event model
module.exports = mongoose.model('Event', eventSchema);
