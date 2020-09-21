// Importing Models
const Event = require('../models/event');
const User = require('../models/user');

// Importing Utility Functions
const throwError = require('../utility/throwError');
const sendMail = require('../utility/sendMail');

// Exporting a function that will sendMail based on the input
exports.notifyUsers = (req, res) => {
  let usersEmail = new Set();
  User.findById(req.userId)
    .then((user) => {
      if (!user.role.includes('Organizer')) {
        const error = new Error('Must be an organizer to notify users');
        error.statusCode = 401;
        throw error;
      }
      if (
        req.body.users.length === 2 &&
        req.body.users.includes('Visitor') &&
        req.body.users.includes('Exhibitor')
      ) {
        return Event.findById(req.params.eventId)
          .populate('registeredUsers')
          .populate({
            path: 'registeredStalls',
            populate: 'userId'
          })
          .populate({
            path: 'registeredConferences',
            populate: 'userId'
          });
      } else if (req.body.users[0] === 'Visitor') {
        return Event.findById(req.params.eventId).populate('registeredUsers');
      } else if (req.body.users[0] === 'Exhibitor') {
        return Event.findById(req.params.eventId)
          .populate({
            path: 'registeredStalls',
            populate: 'userId'
          })
          .populate({
            path: 'registeredConferences',
            populate: 'userId'
          });
      } else {
        const error = new Error(
          'Notification is only for visitors and exhibitors'
        );
        error.statusCode = 422;
        throw error;
      }
    })
    .then((event) => {
      if (req.body.users.includes('Visitor')) {
        event.registeredUsers.forEach((user) => {
          usersEmail.add(user.emailId);
        });
      }
      if (req.body.users.includes('Exhibitor')) {
        event.registeredStalls.forEach((stall) => {
          usersEmail.add(stall.userId.emailId);
        });
        event.registeredConferences.forEach((conference) => {
          usersEmail.add(conference.userId.emailId);
        });
      }
      if (Array.from(usersEmail).length === 0) {
        return {};
      }
      const to = Array.from(usersEmail).join(', ');
      let subject = req.body.subject;
      let body = req.body.body;
      return sendMail(to, subject, body);
    })
    .then((response) => {
      res.status(200).json({
        message: 'Success',
      });
    })

    .catch((err) => {
      throwError(err, res);
    });
};