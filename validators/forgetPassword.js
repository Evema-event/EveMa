const { body } = require('express-validator');

module.exports = [
    body('emailId')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail()
];