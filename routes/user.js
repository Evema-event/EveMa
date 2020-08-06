const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user');

const validator = require('../middleware/validator');

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
            .normalizeEmail()
            .withMessage('Please enter a valid email id')
    ],
    validator,
    userController.verifyUser
);
router.post(
    '/signUp',
    [
        body('userName')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Username atleast 5 characters long'),
        body('emailId')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email id')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Password atleast 5 characters long'),
        body('firstName')
            .trim()
            .isLength({ min: 3 })
            .withMessage('First name atleast 3 characters long'),
        body('lastName')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Last name atleast 3 characters long'),
        body('role')
            .trim()
            .notEmpty()
            .withMessage('Role must not be empty'),
        body('gender')
            .trim()
            .notEmpty()
            .withMessage('Gender must not be empty'),
        body('dateOfBirth')
            .trim()
            .isBefore(new Date().toISOString())
            .withMessage('Date of birth must be before today'),
        body('country')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Country atleast 3 characters long'),
        body('state')
            .trim()
            .isLength({ min: 3 })
            .withMessage('State atleast 3 characters long'),
        body('cityName')
            .trim()
            .isLength({ min: 3 })
            .withMessage('City name atleast 3 characters long'),
        body('zipCode')
            .trim()
            .isLength({ min: 4 })
            .withMessage('Zipcode atleast 4 characters long'),
        body('areaOfInterest')
            .isArray({ min: 1 })
            .withMessage('Atleast 1 area of interest is needed'),
        body('designation')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Designation atleast 5 characters long'),
        body('companyName')
            .optional({ nullable: true })
            .trim()
            .isLength({ min: 3 })
            .withMessage('Company name atleast 3 characters long'),
        body('companyAddress')
            .optional()
            .trim()
            .isLength({ min: 5 })
            .withMessage('Company address atleast 5 characters long'),
        body('contactNumber')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Contact Number atleast 6 digits long')
    ],
    validator,
    userController.signUp
);

module.exports = router;