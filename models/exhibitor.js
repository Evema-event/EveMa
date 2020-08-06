// Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Importing user data
const user = require('./user');

// Creating schema with necessary information
const exhibitorSchema = new Schema(user);

// Exporting exhibitor model
module.exports = mongoose.model('Exhibitor', exhibitorSchema);