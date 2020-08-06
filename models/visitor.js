// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Importing user data
const user = require('./user');

// Creating schema with necessary information
const visitorSchema = new Schema(user);

// Exporting visitor model
module.exports = mongoose.model('Visitor', visitorSchema);