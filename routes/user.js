const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/verifyUser',userController.verifyUser);
router.post('/signUp',userController.signUp);


module.exports = router;