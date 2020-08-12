// Importing express and create router
const express = require('express');
const router = express.Router();

// Importing controllers
const verifyUserController = require('../controllers/verifyUser');
const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');
const passwordController = require('../controllers/password');

// Importing validators
const verifyUserValidator = require('../validators/verifyUser');
const signupValidator = require('../validators/signup');
const loginValidator = require('../validators/login');
const forgetPasswordValidator = require('../validators/forgetPassword');

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

/* 
  Post - /api/user/login/visitor  
  Login visitor
*/
router.post(
  '/login/visitor',
  loginValidator,
  validator,
  loginController.loginVisitor
);

/* 
  Post - /api/user/login/exhibitor
  Login exhibitor 
*/
router.post(
  '/login/exhibitor',
  loginValidator,
  validator,
  loginController.loginExhibitor
);

/* 
  Post - /api/user/forgetPassword/visitor  
  Forget Password visitor
*/
router.post(
  '/forgetPassword/visitor',
  forgetPasswordValidator,
  validator,
  passwordController.forgetPasswordVisitor
);

/* 
  Post - /api/user/forgetPassword/exhibitor
  Forget Password exhibitor 
*/
router.post(
  '/forgetPassword/exhibitor',
  forgetPasswordValidator,
  validator,
  passwordController.forgetPasswordExhibitor
);

// Exporting all routes
module.exports = router;
