// Importing database models
const User = require('../models/user');
const Profile = require('../models/profile');

// Importing utility functions
const hashPassword = require('../utility/hashPassword');
const tokenGenerator = require('../utility/tokenGenerator');
const sendMail = require('../utility/sendMail');
const throwError = require('../utility/throwError');
const { TokenExpiredError } = require('jsonwebtoken');

// Signup function for storing user data to databased
exports.signUp = (req, res) => {
  let savedUser;
  User.findOne({
    $or: [{ userName: req.body.userName }, { emailId: req.body.emailId }],
  })
    .then((isUserExist) => {
      if (isUserExist) {
        const error = new Error('Username or email already exist');
        error.statusCode = 409;
        throw error;
      }
      return hashPassword(req.body.password);
    })
    .then((hashedPassword) => {
      const user = new User({
        userName: req.body.userName,
        emailId: req.body.emailId,
        password: hashedPassword,
        role: [req.body.role]
      });
      return user.save();
    })
    .then(user => {
      savedUser = user;
      const profile = new Profile({
        userId: user._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        country: req.body.country,
        state: req.body.state,
        cityName: req.body.cityName,
        zipCode: req.body.zipCode,
        areaOfInterest: req.body.areaOfInterest,
        designation: req.body.designation,
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        contactNumber: req.body.contactNumber,
      });
      return profile.save()
    })
    .then((savedProfile) => {
      const token = tokenGenerator({
        emailId: savedUser.emailId,
        userName: savedUser.userName,
        userId: savedUser._id,
      });
      const to = savedUser.emailId;
      let subject = 'EveMa - Signup successfully';
      let body = `
                <h1>Welcome to EveMa</h1>
                <p>Dear customer,</p>
                <p>Your new EveMa account has been created successfully.</p>
                <h3>Thanks for registering!</h3>
                <br />
                <p>EveMa Team</p>
                <p>Link: https://evema-event.herokuapp.com/</p>
            `;
      sendMail(to, subject, body);
      res
        .status(200)
        .json({ message: 'Success', token: token, user: savedUser });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};