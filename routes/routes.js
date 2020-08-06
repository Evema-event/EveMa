// Importing express and create router
const express = require('express');
const router = express.Router();

// Importing all route files
const event = require('./event');
const user = require('./user');

// Event based details route
router.use('/event', event);

// User based details route
router.use('/user', user);

// Exporting all routes
module.exports = router;