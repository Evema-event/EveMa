// Importing npm packages
const nodemailer = require('nodemailer');
const sendgridTransporter = require('nodemailer-sendgrid-transport');

// Creating tranporter for sending mail
const transporter = nodemailer.createTransport(sendgridTransporter({
    auth: {
        api_key: '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'
    }
}));

// Function will sendmail wheneven called
module.exports = (to, subject, body) => {
    transporter.sendMail({
        to: to,
        from: 'gokulnath.20.1@protosem.tech',
        subject: subject,
        html: body
    });
}