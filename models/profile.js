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
  image: {
    type: String,
    required: true
  },
  registeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  visitorConferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conference'
    }
  ],
  registeredStalls: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
      },
      stallId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Stall'
        }
      ]
    }
  ],
  registeredConferences: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
      },
      conferenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Conference'
      }
    }
  ],
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
