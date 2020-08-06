// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Importing user data
const user = require('./user');

// Creating schema with necessary information
const organizerSchema = new Schema(user);

// Exporting organizer model
module.exports = mongoose.model('Organizer', organizerSchema);