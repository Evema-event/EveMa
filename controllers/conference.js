// Importing Models
const User = require('../models/user');
const Profile = require('../models/profile');
const Event = require('../models/event');
const Conference = require('../models/conference');

// Importing throwError Utility function
const throwError = require('../utility/throwError');

//Get stalls of particular event
exports.getConferences = (req, res) => {
  Event.findById(req.params.eventId)
    .populate({
      path: "registeredConferences",
      populate: {
        path: "userId"
      }
    })
    .then(event => {
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Success', conferences: event.registeredConferences });
    })
    .catch(err => {
      throwError(err, res);
    })
}

// Exhibitor can register a Conference
exports.registerConference = (req, res) => {
  let loadedEvent;
  let loadedProfile;
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
      return Profile.findOne({ userId: req.userId });
    })
    .then(profile => {
      if (profile.registeredConferences && profile.registeredConferences.length > 0) {
        profile.registeredConferences.forEach(event => {
          if (event.eventId.toString() === req.params.eventId.toString()) {
            const error = new Error('You can only register 1 conference');
            error.statusCode = 422;
            throw error;
          }
        });
      }
      loadedProfile = profile;
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
      loadedProfile.registeredConferences.push({
        eventId: req.params.eventId,
        conferenceId: loadedConference._id
      });
      return loadedProfile.save();
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
