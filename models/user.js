// A data required for user schema
const user = {
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  }
};

// Exporting user data
module.exports = user;
