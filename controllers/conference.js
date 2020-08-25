// Importing Models
const User = require('../models/user');
const Profile = require('../models/profile');
const Event = require('../models/event');
const Conference = require('../models/conference');

// Importing throwError Utility function
const throwError = require('../utility/throwError');

// Exhibitor can register a Conference
exports.registerConference = (req, res) => {
  let loadedEvent;
  let loadedConference;
  Event.findById(req.params.eventId)
    .then((event) => {
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      loadedEvent = event;
      return User.findById(req.userId);
    })
    .then((user) => {
      if (!user.role.includes('Exhibitor')) {
        const error = new Error('Exhibitor can only register for a conference');
        error.statusCode = 401;
        throw error;
      }
      const conference = new Conference({
        title: req.body.title,
        theme: req.body.theme,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        seatLimit: req.body.seatLimit,
        userId: req.userId,
        eventId: req.params.eventId,
      });
      return conference.save();
    })
    .then((conference) => {
      loadedConference = conference;
      return Profile.findOne({ userId: req.userId });
    })
    .then((profile) => {
      profile.registeredConferences.push(loadedConference._id);
      return profile.save();
    })
    .then((profile) => {
      loadedEvent.registeredConferences.push(loadedConference._id);
      return loadedEvent.save();
    })
    .then((event) => {
      res
        .status(200)
        .json({ message: 'Success', conference: loadedConference });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};
