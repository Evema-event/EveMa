// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema with necessary information
const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registeredEvents: [mongoose.Schema.Types.ObjectId],
  registeredStalls: [mongoose.Schema.Types.ObjectId],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  areaOfInterest: {
    type: Array,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

// Exporting visitor model
module.exports = mongoose.model('Profile', profileSchema);
