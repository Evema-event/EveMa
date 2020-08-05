const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user');

router.post(
    '/verifyUser',
    [
        body('userName')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Username atleast 5 characters long'),
        body('emailId')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email id')
    ],
    userController.verifyUser
);
router.post('/signUp', userController.signUp);

module.exports = router;