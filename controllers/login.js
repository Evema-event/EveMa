// Importing database models
const User = require('../models/user');

// Importing npm packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login function generate token based on user availability
exports.login = (req, res) => {
  let savedUser;
  User.findOne({
    $or: [{ userName: req.body.userName }, { emailId: req.body.userName }],
  })
    .then((user) => {
      if (!user) {
        const error = new Error('Username or email does not exist');
        error.statusCode = 404;
        throw error;
      }
      savedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        const error = new Error('Password does not match');
        error.statusCode = 401;
        throw error;
      }
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
