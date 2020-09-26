// Importing Models
const User = require('../models/user');
const Profile = require('../models/profile')

// Importing throw error utility function
const throwError = require('../utility/throwError');
const tokenGenerator = require('../utility/tokenGenerator')

// Importing npm packages
const bcrypt = require('bcryptjs');

//Create and Switch account between exhibitor and visitor
exports.switchUser = (req, res) => {
  let loadedUser;
  let existingRole;
  User.findById(req.userId)
    .then((user) => {
      if (user.role.includes('Organizer')) {
        const error = new Error('Organizer cannot create visitor and exhibitor accounts!');
        error.statusCode = 409;
        throw error;
      }
      existingRole = user.role[0];
      if (user.role.length >= 2) {
        const error = new Error('Two accounts already exist');
        error.statusCode = 409;
        throw error;
      }
      loadedUser = user;
      return user;
    })
    .then((user) => {
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isMatch) => {
      if (isMatch) {
        if (existingRole === 'Visitor') {
          loadedUser.role.push('Exhibitor');
        } else {
          loadedUser.role.push('Visitor');
        }
      } else {
        const error = new Error('Password does not match');
        error.statusCode = 422;
        throw error;
      }
      return loadedUser.save();
    })
    .then((user) => {
      if (user.role.includes('Organizer')) {
        return {};
      }
      return Profile.findOne({ userId: user._id });
    })
    .then(profile => {
      const token = tokenGenerator({
        emailId: loadedUser.emailId,
        userName: loadedUser.userName,
        userId: loadedUser._id,
      });
      res
        .status(200)
        .json({ message: 'Success', token: token, user: loadedUser, profile: profile });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};
