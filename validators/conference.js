// Importing npm packages
const { body } = require('express-validator');

//Exporting all conditions
module.exports = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Title must atleast be 5 characters long'),
  body('theme')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Theme must atleast be 5 characters long'),
  body('description')
    .trim()
    .isLength({ min: 15 })
    .withMessage('Description must atleast be 15 characters long'),
  body('startTime').notEmpty().withMessage('Start time must not be empty'),
  body('endTime').notEmpty().withMessage('End time must not be empty'),
  body('date')
    .isAfter(new Date().toISOString())
    .withMessage('Date must be after today'),
  body('seatLimit')
    .isNumeric()
    .isInt({ min: 10 })
    .withMessage('Minimum seat limit is 10'),
];
