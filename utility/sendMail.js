// Importing npm packages
const nodemailer = require('nodemailer');

// Creating tranporter for sending mail
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'evema.eventmanagement@gmail.com',
    pass: 'evema123',
  },
});

// Function will sendmail whenever called
module.exports = (to, subject, body) => {
  let mailDetails = {
    from: 'evema.eventmanagement@gmail.com',
    to: to,
    subject: subject,
    html: body,
  };
  return mailTransporter.sendMail(mailDetails);
};
