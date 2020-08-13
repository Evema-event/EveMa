// Importing database models
const User = require('../models/user');

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
            if (err.statusCode) {
                res.status(err.statusCode).json({ message: 'Failed', error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ message: 'Failed', error: 'Server Error' });
            }
        });
}