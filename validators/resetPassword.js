const { body } = require('express-validator');

module.exports = [
    body('emailId')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),
    body('otp')
        .trim()
        .isLength({ min: 6, max: 6 })
        .withMessage('Invalid OTP'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Password atleast 5 characters long'),
];