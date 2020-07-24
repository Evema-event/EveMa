const express = require('express');

const welcomeController = require('../controllers/welcome');

const router = express.Router();

router.use('/', welcomeController.welcome);

module.exports = router;