const express = require('express');

// Importing all route files
const event = require('./event');

const welcomeController = require('../controllers/welcome');

const router = express.Router();

router.use('/event', event);
router.use('/', welcomeController.welcome);

module.exports = router;