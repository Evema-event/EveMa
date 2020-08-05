const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.verifyUser = (req, res) => {

    const validationErrors = validationResult(req).errors;
    if (validationErrors.length > 0) {
        return res.status(422).json({ message: 'Failed', error: validationErrors });
    }

    const userName = req.body.userName;
    const emailId = req.body.emailId;
    User.findOne({ $or: [{ userName: userName }, { emailId: emailId }] })
        .then(user => {
            if (user) {
                res.status(409).json({ message: 'Failed', error: 'Username or Email already exist!' });
            } else {
                res.status(200).json({ message: 'Success' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed', error: 'Server Error' });
        })
};

exports.signUp = (req, res) => {

    const validationErrors = validationResult(req).errors;
    if (validationErrors.length > 0) {
        return res.status(422).json({ message: 'Failed', error: validationErrors });
    }

    User.findOne({ $or: [{ userName: req.body.userName }, { emailId: req.body.emailId }] })
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