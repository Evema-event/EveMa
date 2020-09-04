const { body } = require('express-validator');

module.exports = [
  body('subject')
    .trim()
    .isLength({ min: 10 })
    .withMessage('The subject line must be atleast 10 characters long'),
  body('body')
    .isLength({ min: 25 })
    .withMessage('The body must atleast be 25 characters long'),
  body('users')
    .isArray({ min: 1, max: 2 })
    .withMessage('users must be visitors or exhibitors or both.'),
];
