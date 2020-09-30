// Importing models
const Event = require('../models/event');
const User = require('../models/user');
const Profile = require('../models/profile');
const Stall = require('../models/stall');
const Conference = require('../models/conference');

// Importing throw error utility function
const throwError = require('../utility/throwError');
const deleteFile = require('../utility/deleteFile');

// Send events that have end date today or after
exports.getUpcomingEvents = (req, res) => {
  Event.find({
    endDate: {
      $gte: new Date(Date.now() - 24 * 3600 * 1000)
    }
  })
    .then((events) => {
      return res.status(200).json({
        message: 'Success',
        events: events
      });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Send events that have end date before today
exports.getCompletedEvents = (req, res) => {
  Event.find({
    endDate: {
      $lt: new Date(Date.now() - 24 * 3600 * 1000)
    }
  })
    .then((events) => {
      return res.status(200).json({
        message: 'Success',
        events: events
      });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Send visitor list for an event
exports.getVisitorList = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user.role.includes('Organizer')) {
        const error = new Error("Only organizers can view the visitor's list");
        error.statusCode = 401;
        throw error;
      }
      return Event.findById(req.params.eventId)
        .populate('registeredUsers')
    })
    .then((event) => {
      if (!event) {
        const error = new Error("Event not found");
        error.statusCode = 404;
        throw error;
      }
      return Promise.all(
        event.registeredUsers.map((user) => {
          return Profile.findOne({
            userId: user._id
          })
            .then((profile) => {
              let newuser = {
                ...profile._doc,
                emailId: user.emailId,
                userName: user.userName,
              };
              return newuser;
            })
            .catch((err) => {
              throwError(err, res);
            });
        })
      );
    })
    .then((list) => {
      res.status(200).json({
        message: 'Success',
        visitorlist: list
      });
    })
    .catch((err) => {
      throwError(err, res);
    });
};

// Add event to database
exports.addEvent = (req, res) => {
  // Verify user is organizer or not
  User.findById(req.userId)
    .then((user) => {
      if (!user.role.includes('Organizer')) {
        const error = new Error('Organizer only can able to add an event');
        error.statusCode = 401;
        throw error;
      }
      // create an event
      const event = new Event({
        name: req.body.name,
        description: req.body.description,
        contactNumber: req.body.contactNumber,
        contactEmail: req.body.contactEmail,
        price: req.body.price,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        venue: req.body.venue,
        registrationLastdate: req.body.registrationLastdate,
      });
      // Store an event
      return event.save();
    })
    .then((event) => {
      res.status(200).json({
        message: 'Success',
        event: event
      });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Delete an event from database
exports.deleteEvent = (req, res) => {
  // Organizer only can able to delete event
  let loadedEvent;
  User.findById(req.userId)
    .then((user) => {
      if (!user.role.includes('Organizer')) {
        const error = new Error('Organizer only can able to delete an event');
        error.statusCode = 401;
        throw error;
      }
      // Delete event
      return Event.findById(req.params.eventId);
    })
    .then(event => {
      if (!event) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        throw error;
      }
      if (new Date(event.startDate).getTime() - Date.now() < 2 * 24 * 3600 * 1000) {
        const error = new Error("You can only able to delete event before 2 days");
        error.statusCode = 403;
        throw error;
      }
      loadedEvent = event;
      return Promise.all(
        event.registeredUsers.map((userId) => {
          return Profile.findOne({ userId: userId })
            .then((profile) => {

              profile.registeredEvents.pop(req.params.eventId);

              profile.visitorConferences = profile.visitorConferences.filter(conference => !loadedEvent.registeredConferences.includes(conference));

              return profile.save();
            })
            .catch((err) => {
              throwError(err, res);
            });
        })
      );
    })
    .then(profile => {
      return Promise.all(
        loadedEvent.registeredUsers.map((userId) => {
          return Profile.findOne({ userId: userId })
            .then((profile) => {

              let stalls = [];
              profile.registeredStalls.forEach((stall) => {
                if (stall.eventId.toString() !== req.params.eventId.toString()) {
                  stalls.push(stall)
                }
              });
              profile.registeredStalls = stalls;

              return profile.save();
            })
            .catch((err) => {
              throwError(err, res);
            });
        })
      );
    })
    .then(profile => {
      return Promise.all(
        loadedEvent.registeredStalls.map((stallId) => {
          return Stall.findById(stallId)
            .then(stall => {
              stall.images.forEach(image => {
                deleteFile(image);
              });
              stall.documents.forEach(document => {
                deleteFile(document);
              });
              return Profile.findOne({ userId: stall.userId });
            })
            .then((profile) => {

              let stalls = [];
              profile.registeredStalls.forEach((stall) => {
                if (stall.eventId.toString() !== req.params.eventId.toString()) {
                  stalls.push(stall)
                }
              });
              profile.registeredStalls = stalls;

              return profile.save();
            })
            .then(profile => {
              return Stall.findByIdAndDelete(stallId);
            })
            .catch(err => { });
        })
      );
    })
    .then(stall => {
      return Promise.all(
        loadedEvent.registeredConferences.map((conferenceId) => {
          return Conference.findById(conferenceId)
            .then(conference => {
              return Profile.findOne({ userId: conference.userId });
            })
            .then((profile) => {

              let confs = [];
              profile.registeredConferences.forEach((conf) => {
                if (conf.eventId.toString() !== req.params.eventId.toString()) {
                  confs.push(conf)
                }
              });
              profile.registeredConferences = confs;

              return profile.save();
            })
            .then(profile => {
              return Conference.findByIdAndDelete(conferenceId);
            })
            .catch(err => { });
        })
      );
    })
    .then(conference => {
      return Event.findByIdAndDelete(req.params.eventId);
    })
    .then((event) => {
      res.status(200).json({
        message: 'Success',
        event: event
      });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Visitor can register for an event
exports.registerEvent = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user.role.includes('Visitor')) {
        const error = new Error('User only can able to register for an event');
        error.statusCode = 401;
        throw error;
      }
      return Profile.findOne({
        userId: req.userId
      });
    })
    .then((profile) => {
      if (profile.registeredEvents.includes(req.params.eventId)) {
        const error = new Error('User already register for an event');
        error.statusCode = 422;
        throw error;
      }
      profile.registeredEvents.push(req.params.eventId);
      return profile.save();
    })
    .then((profile) => {
      return Event.findById(req.params.eventId);
    })
    .then((event) => {
      event.registeredUsers.push(req.userId);
      return event.save();
    })
    .then((event) => {
      res.status(200).json({
        message: 'Success',
        event: event
      });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};