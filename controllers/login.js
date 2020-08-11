// Importing database models
const Visitor = require('../models/visitor');
const Exhibitor = require('../models/exhibitor');

// Importing npm packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login function generate token based on user availability
const login = (User, req, res) => {
  let savedUser;
  return User.findOne({
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
        const error = new error('Password does not match');
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

// Login visitor call login function with Visitor as user
exports.loginVisitor = (req, res) => {
  return login(Visitor, req, res);
};

// Login exhibitor call login function with Exhibitor as user
exports.loginExhibitor = (req, res) => {
  return login(Exhibitor, req, res);
};
