const mongoose = require('mongoose');

const user = require('./user');

const Schema = mongoose.Schema;

const organizerSchema = new Schema(user);

module.exports = mongoose.model('Organizer', organizerSchema);