// Importing npm packages
const { body } = require('express-validator');

// Exporting all conditions
module.exports = [
    body('userId')
        .trim()
        .isLength({ min: 24, max: 24 })
        .withMessage('Invalid user id')
];
