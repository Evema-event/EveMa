// Importing database models
const User = require('../models/user');
const Profile = require('../models/profile');

// Importing npm packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importing send mail function
const sendMail = require('../utility/sendMail');

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
      return bcrypt.hash(req.body.password, 12);
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
      const token = jwt.sign(
        {
          emailId: savedUser.emailId,
          userName: savedUser.userName,
          userId: savedUser._id,
        },
        'secret',
        {
          expiresIn: '6h',
        }
      );
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
      if (err.statusCode) {
        res
          .status(err.statusCode)
          .json({ message: 'Failed', error: err.message });
      } else {
        console.log(err);
        res.status(500).json({ message: 'Failed', error: 'Server Error' });
      }
    });
};