// Importing database models
const Visitor = require('../models/visitor');
const Exhibitor = require('../models/exhibitor');

// Importing send mail function
const sendMail = require('../utility/sendMail');

// Forget Password function send OTP to user mail provide while signup
const forgetPassword = (User, req, res) => {
    const emailId = req.body.emailId;
    let otp;
    return User.findOne({ emailId: emailId })
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
                <h5>Dear customer,</h5>
                <br />
                <p>We received request regarding password reset.</p>
                <h6>OTP for password reset <b>${otp}</b>.</h6>
                <p>If the mail was not requested by you, please ignore it.</p>
                <br />
                <br />
                <p>EveMa Team</p>
                <p>Link: https://evema-event.herokuapp.com/</p>
            `;
            return sendMail(to, subject, body);
        })
        .then(response => {
            console.log(response);
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

// Calls forgetPassword function with Visitor as User
exports.forgetPasswordVisitor = (req, res) => {
    return forgetPassword(Visitor, req, res);
}

// Calls forgetPassword function with Exhibitor as User
exports.forgetPasswordExhibitor = (req, res) => {
    return forgetPassword(Exhibitor, req, res);
}