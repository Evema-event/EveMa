// Importing npm packages
const { body } = require('express-validator');

// Exporting all conditions
module.exports = [
  body('name')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Eventname atleast 5 characters long'),
  body('description')
    .trim()
    .isLength({ min: 15 })
    .withMessage('Description atleast 15 characters long'),
  body('contactNumber')
    .isNumeric()
    .withMessage('Contact Number must be number'),
  body('contactEmail')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email id')
    .normalizeEmail(),
  body('price')
    .isNumeric()
    .withMessage('Price must be number'),
  body('startDate')
    .isAfter(new Date().toISOString())
    .withMessage('Start Date must be after today'),
  body('endDate')
    .isAfter(new Date().toISOString())
    .withMessage('End Date must be afer today'),
  body('startTime')
    .notEmpty()
    .withMessage('Start time must not be empty'),
  body('endTime')
    .notEmpty()
    .withMessage('End time must not be empty'),
  body('venue')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Venue should be 5 characters long'),
  body('registrationLastdate')
    .isAfter(new Date().toISOString())
    .withMessage('Registration last date must be afer today'),
];
