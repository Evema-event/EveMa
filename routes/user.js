// Importing express and create router
const express = require('express');
const router = express.Router();

// Importing controllers
const verifyUserController = require('../controllers/verifyUser');
const signupController = require('../controllers/signup');

// Importing validators
const verifyUserValidator = require('../validators/verifyUser');
const signupValidator = require('../validators/signup');

// Importing middleware
const validator = require('../middleware/validator');

/* 
  Post - /api/user/verifyUser/visitor  
  Verify visitor already exist or not 
*/
router.post(
  '/verifyUser/visitor',
  verifyUserValidator,
  validator,
  verifyUserController.verifyVisitor
);

/* 
  Post - /api/user/verifyUser/exhibitor  
  Verify exhibitor already exist or not 
*/
router.post(
  '/verifyUser/exhibitor',
  verifyUserValidator,
  validator,
  verifyUserController.verifyExhibitor
);

/* 
  Post - /api/user/signup/visitor  
  Signup visitor
*/
router.post(
  '/signUp/visitor',
  signupValidator,
  validator,
  signupController.signUpVisitor
);

/* 
  Post - /api/user/signup/exhibitor
  Signup exhibitor 
*/
router.post(
  '/signUp/exhibitor',
  signupValidator,
  validator,
  signupController.signUpExhibitor
);

// Exporting all routes
module.exports = router;