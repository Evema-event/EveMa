// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema with necessary information
const userSchema = new Schema({
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
  role: {
    type: Array,
    required: true,
  },
  otpData: {
    otp: String,
    expiresIn: Date,
  }
});

// Exporting visitor model
module.exports = mongoose.model('User', userSchema);
