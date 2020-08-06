const mongoose = require('mongoose');

const user = require('./user');

const Schema = mongoose.Schema;

const exhibitorSchema = new Schema(user);

module.exports = mongoose.model('Exhibitor', exhibitorSchema);