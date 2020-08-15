// Importing database models
const User = require('../models/user');

// Importing npm packages
const bcrypt = require('bcryptjs');

// Importing send mail function
const sendMail = require('../utility/sendMail');

// Forget Password function send OTP to user mail provided while signup
exports.forgetPassword = (req, res) => {
    const emailId = req.body.emailId;
    let otp;
    User.findOne({ emailId: emailId })
        .then(user => {
            if (!user) {
                const error = new Error('Email id not found');
                error.statusCode = '404';
                throw error;
            }
            otp = Math.random().toString().slice(4, 10);
            user.otpData.otp = otp;
            user.otpData.expiresIn = Date.now() + 5 * 60 * 1000;
            return user.save();
        })
        .then(savedUser => {
            const to = savedUser.emailId;
            const subject = 'EveMa - Requesting password reset';
            const body = `
                <h3>Dear customer,</h3>
                <p>We received request regarding password reset.</p>
                <h4>OTP for password reset <b>${otp}</b>. Don't share the OTP with anyone and OTP is valid only for 5 minutes.</h4>
                <p>If the mail was not requested by you, please ignore it.</p>
                <br />
                <p>EveMa Team</p>
                <p>Link: https://evema-event.herokuapp.com/</p>
            `;
            return sendMail(to, subject, body);
        })
        .then(response => {
            res.status(200).json({ message: 'Success' });
        })
        .catch(err => {
            if (err.statusCode) {
                res
                    .status(err.statusCode)
                    .json({ message: 'Failed', error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ message: 'Failed', error: 'Server Error' });
            }
        });
}

exports.resetPassword = (req, res) => {
    let loadedUser;
    User.findOne({ emailId: req.body.emailId })
        .then(user => {
            if (!user) {
                const error = new Error('Email id not found');
                error.statusCode = '404';
                throw error;
            }
            if (user.otpData.otp !== req.body.otp || Date.parse(user.otpData.expiresIn) < Date.now()) {
                const error = new Error('Invalid OTP');
                error.statusCode = '409';
                throw error;
            }
            loadedUser = user;
            return bcrypt.hash(req.body.password, 12);
        })
        .then(hashedPassword => {
            loadedUser.password = hashedPassword;
            loadedUser.otpData = {};
            return loadedUser.save();
        })
        .then(savedUser => {
            res.status(200).json({ message: 'Success' });
        })
        .catch(err => {
            if (err.statusCode) {
                res
                    .status(err.statusCode)
                    .json({ message: 'Failed', error: err.message });
            } else {
                console.log(err);
                res.status(500).json({ message: 'Failed', error: 'Server Error' });
            }
        });
}