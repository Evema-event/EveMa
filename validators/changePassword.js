// Importing npm packages
const { body } = require('express-validator');

// Exporting all conditions
module.exports = [
    body('oldPassword')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Old Password must be atleast 5 characters long'),
    body('newPassword')
        .trim()
        .isLength({ min: 5 })
        .withMessage('New Password must be atleast 5 characters long'),
];
