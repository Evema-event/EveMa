const mongoose = require('mongoose');

const user = require('./user');

const Schema = mongoose.Schema;

const visitorSchema = new Schema(user);

module.exports = mongoose.model('Visitor', visitorSchema);