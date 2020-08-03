const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/verifyUser',userController.verifyUser);

module.exports = router;