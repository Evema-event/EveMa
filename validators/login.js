// Importing npm packages
const { body } = require('express-validator');

// Exporting all conditions
module.exports = [
  body('userName')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username atleast 5 characters long'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password atleast 5 characters long'),
];
