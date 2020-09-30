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
      path: 'registeredConferences',
      populate: {
        path: 'userId',
      },
    })
    .then((event) => {
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      return Promise.all(
        event.registeredConferences.map((conference) => {
          return Profile.findOne({ userId: conference.userId._id })
            .then((profile) => {
              let newConference = {
                ...conference._doc,
                user: profile,
              };
              return newConference;
            })
            .catch((err) => {
              throwError(err, res);
            });
        })
      );
    })
    .then((conferences) => {
      res.status(200).json({ message: 'Success', conferences: conferences });
    })
    .catch((err) => {
      throwError(err, res);
    });
};

//Exhibitor can delete a Conference
exports.deleteConference = (req, res) => {
  let eventId
  User.findById(req.userId)
    .then((user) => {
      if (!user.role.includes('Exhibitor')) {
        const error = new Error('Only Exhibitor can delete a conference.')
        error.statusCode = 401
        throw error
      }
      return Conference.findById(req.params.conferenceId)
        .populate("eventId")
    })
    .then((conf) => {
      if (!conf) {
        const error = new Error('Conference not found')
        error.statusCode = 404
        throw error
      }
      let currentdate = Date.now()
      let confDate = conf.eventId.startDate
      let limitDate = new Date(confDate.setDate(confDate.getDate() - 2)).toISOString()
      if (currentdate > limitDate) {
        const error = new Error('Time limit Exceeded to delete')
        error.statusCode = 401
        throw error
      }
      eventId = conf.eventId._id
      return Event.findById(eventId)
    })
    .then((event) => {
      event.registeredConferences = event.registeredConferences.filter(
        (conferenceId) => {
          return conferenceId.toString() !== req.params.conferenceId.toString()
        }
      )
      return event.save();
    })
    .then((event) => {
      return Profile.findOne({
        userId: req.userId
      })
    })
    .then((profile) => {
      let confl = []
      profile.registeredConferences.forEach((conf) => {
        if (conf.eventId.toString() !== eventId.toString()) {
          confl.push(conf)
        }
      })
      profile.registeredConferences = confl
      profile.visitorConferences = profile.visitorConferences.filter(conference => conference.toString() !== req.params.conferenceId.toString());
      return profile.save()
    })
    .then((profile) => {
      return Conference.findByIdAndDelete(req.params.conferenceId)
    })
    .then((conference) => {
      return res.status(200).json({ message: 'Success', conference: conference })
    })
    .catch((err) => {
      throwError(err, res)
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
    .then((profile) => {
      if (
        profile.registeredConferences &&
        profile.registeredConferences.length > 0
      ) {
        profile.registeredConferences.forEach((event) => {
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
        conferenceId: loadedConference._id,
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

// Visitor can register a conference
exports.visitorConference = (req, res) => {
  let loadedConference;
  User.findById(req.userId)
    .then(user => {
      if (!user.role.includes("Visitor")) {
        const error = new Error("Visitor only able to register conference");
        error.statusCode = 401;
        throw error;
      }
      return Conference.findById(req.params.conferenceId);
    })
    .then(conference => {
      if (!conference) {
        const error = new Error("Conference not found");
        error.statusCode = 404;
        throw error;
      }
      if (conference.userId.toString() === req.userId.toString()) {
        const error = new Error("You cannot register for your own conference");
        error.statusCode = 422;
        throw error;
      }
      if (conference.registeredVisitors) {
        if (conference.registeredVisitors.includes(req.userId)) {
          const error = new Error("User already registered");
          error.statusCode = 422;
          throw error;
        } else if (conference.registeredVisitors.length >= conference.seatLimit) {
          const error = new Error("House full");
          error.statusCode = 422;
          throw error;
        } else {
          conference.registeredVisitors.push(req.userId);
        }
      } else {
        conference.registeredVisitors = [req.userId];
      }
      return conference.save();
    })
    .then(conference => {
      loadedConference = conference;
      return Profile.findOne({ userId: req.userId });
    })
    .then(profile => {
      if (profile.visitorConferences) {
        if (profile.visitorConferences.includes(req.params.conferenceId)) {
          const error = new Error("User already registered");
          error.statusCode = 422;
          throw error;
        } else {
          profile.visitorConferences.push(req.params.conferenceId);
        }
      } else {
        profile.visitorConferences = [req.params.conferenceId];
      }
      return profile.save();
    })
    .then(profile => {
      res.status(200).json({ message: "Success", conference: loadedConference });
    })
    .catch(err => {
      throwError(err, res);
    });
};

// Send visitor list for an conference
exports.getVisitors = (req, res) => {
  Conference.findById(req.params.conferenceId)
    .populate('registeredVisitors')
    .then((conference) => {
      if (!conference) {
        const error = new Error("Conference not found");
        error.statusCode = 404;
        throw error;
      }
      return Promise.all(
        conference.registeredVisitors.map(visitor => {
          return Profile.findOne({
            userId: visitor._id
          })
            .then((profile) => {
              let newvisitor = {
                ...profile._doc,
                emailId: visitor.emailId,
                userName: visitor.userName,
              };
              return newvisitor;
            })
            .catch((err) => {
              throw err;
            });
        })
      );
    })
    .then((list) => {
      res.status(200).json({
        message: 'Success',
        visitors: list
      });
    })
    .catch((err) => {
      throwError(err, res);
    });
};