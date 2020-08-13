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
const resetPasswordValidator = require('../validators/resetPassword');

// Importing middleware
const validator = require('../middleware/validator');

/* 
  Post - /api/user/verifyUser 
  Verify user already exist or not 
*/
router.post(
  '/verifyUser',
  verifyUserValidator,
  validator,
  verifyUserController.verifyUser
);

/* 
  Post - /api/user/signup
  Signup user
*/
router.post(
  '/signUp',
  signupValidator,
  validator,
  signupController.signUp
);

/* 
  Post - /api/user/login/visitor  
  Login visitor
*/
router.post(
  '/login',
  loginValidator,
  validator,
  loginController.login
);

/* 
  Post - /api/user/forgetPassword
  Forget Password will send otp to user email
*/
router.post(
  '/forgetPassword',
  forgetPasswordValidator,
  validator,
  passwordController.forgetPassword
);

/* 
  Post - /api/user/resetPassword
  Reset Password will set new password based on otp
*/
router.put(
  '/resetPassword',
  resetPasswordValidator,
  validator,
  passwordController.resetPassword
);

// Exporting all routes
module.exports = router;
