const mongoose = require('mongoose');

const user = require('./user');

const Schema = mongoose.Schema;

const userSchema = new Schema(user);

module.exports = mongoose.model('Organizer', userSchema);