// Importing database models
const User = require('../models/user');

// Importing throw error utility function
const throwError = require('../utility/throwError');

// VerifyUser function to check the account is already exist or not.
exports.verifyUser = (req, res) => {
    User.findOne({
        $or: [
            { userName: req.body.userName },
            { emailId: req.body.emailId }
        ]
    })
        .then(user => {
            if (user) {
                const error = new Error('Username or email already exist');
                error.statusCode = 409;
                throw error;
            }
            return res.status(200).json({ message: 'Success' });
        })
        .catch(err => {
            return throwError(err, res);
        });
}