// Importing database models
const Visitor = require('../models/visitor');
const Exhibitor = require('../models/exhibitor');

// Importing npm packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importing send mail function
const sendMail = require('../utility/sendMail');

// Singup function for storing user data to databased based on the type of user
const signUp = (User, req, res) => {
    return User.findOne({
        $or: [
            { userName: req.body.userName },
            { emailId: req.body.emailId }
        ]
    })
        .then(isUserExist => {
            if (isUserExist) {
                const error = new Error('Username or email already exist');
                error.statusCode = 409;
                throw error;
            }
            return bcrypt.hash(req.body.password, 12);
        })
        .then(hashedPassword => {
            const user = new User({
                userName: req.body.userName,
                emailId: req.body.emailId,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
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
                contactNumber: req.body.contactNumber
            });
            return user.save();
        })
        .then(savedUser => {
            const token = jwt.sign(
                {
                    emailId: savedUser.emailId,
                    userName: savedUser.userName,
                    userId: savedUser._id
                },
                'secret',
                {
                    expiresIn: '6h'
                }
            );
            const to = savedUser.emailId;
            let subject = 'EveMa - Signup successfully';
            let body = `
                <h1>Welcome to EveMa</h1>
                <p>Dear customer,</p>
                <br />
                <p>Your new EveMa account has been created successfully.</p>
                <h5>Thanks for registering!</h5>
                <br />

                <p>EveMa Team</p>
                <p>Link: https://evema-event.herokuapp.com/</p>
            `;
            sendMail(to, subject, body);
            res.status(200).json({ message: 'Success', token: token, user: savedUser });
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

// Singup visitor call signUp function with Visitor as user
exports.signUpVisitor = (req, res) => {
    return signUp(Visitor, req, res);
}

// Singup exhibitor call signUp function with Exhibitor as user
exports.signUpExhibitor = (req, res) => {
    return signUp(Exhibitor, req, res);
}