// Importing database models
const Visitor = require('../models/visitor');
const Exhibitor = require('../models/exhibitor');

// VerifyUser function to check the account is already exist or not.
const verifyUser = (User, req, res) => {
    return User.findOne({
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

// Verify visitor call verifyUser function as input of visitor
exports.verifyVisitor = (req, res) => {
    return verifyUser(Visitor, req, res);
};

// Verify exhibitor call verifyUser function as input of exhibitor
exports.verifyExhibitor = (req, res) => {
    return verifyUser(Exhibitor, req, res);
};