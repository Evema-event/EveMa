//Importing npm packages
const { body } = require('express-validator');

//Exporting all conditions
module.exports = [
  body('productName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Product name must atleast be 3 characters long'),
  body('description')
    .trim()
    .isLength({ min: 15 })
    .withMessage('Description must atleast be 15 characters long'),
  body('productDomain')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Product domain must atleast be 5 characters long'),
];
