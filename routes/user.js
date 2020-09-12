// Importing express and create router
const express = require('express');
const router = express.Router();

// Importing controllers
const verifyUserController = require('../controllers/verifyUser');
const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');
const passwordController = require('../controllers/password');
const profileController = require('../controllers/profile');
const switchUserController = require('../controllers/switchUser');

// Importing validators
const verifyUserValidator = require('../validators/verifyUser');
const signupValidator = require('../validators/signup');
const loginValidator = require('../validators/login');
const forgetPasswordValidator = require('../validators/forgetPassword');
const resetPasswordValidator = require('../validators/resetPassword');

// Importing middleware
const validator = require('../middleware/validator');
const authenticate = require('../middleware/authenticate');

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

/* 
 Get - /api/user/getProfile
 Send profile details of user based on token
*/
router.get(
  '/getProfile',
  authenticate,
  profileController.getProfile
)

/*
POST - /api/user/switchUser
Create and Switch account between exhibitor and visitor
*/
router.post(
  '/switchUser',
  authenticate,
  switchUserController.switchUser
)

// Exporting all routes
module.exports = router;
