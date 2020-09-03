// Importing models
const Event = require('../models/event');
const User = require('../models/user');
const Profile = require('../models/profile');

// Importing throw error utility function
const throwError = require('../utility/throwError');

// Send events that have end date today or after
exports.getUpcomingEvents = (req, res) => {
  Event.find({ endDate: { $gte: new Date(Date.now() - 24 * 3600 * 1000) } })
    .then((events) => {
      return res.status(200).json({ message: 'Success', events: events });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Send events that have end date before today
exports.getCompletedEvents = (req, res) => {
  Event.find({ endDate: { $lt: new Date(Date.now() - 24 * 3600 * 1000) } })
    .then((events) => {
      return res.status(200).json({ message: 'Success', events: events });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Send visitor list for an event
exports.getVisitorList = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (user.role[0] !== 'Organizer') {
        const error = new Error("Only organizers can view the visitor's list");
        error.statusCode = 401;
        throw error;
      }
      Event.findById(req.params.eventId)
        .populate('registeredUsers')
        .then((event) => {
          if (!event) {
            const error = new Error('Event not found');
            error.statusCode = 404;
            throw error;
          }
          return Promise.all(
            event.registeredUsers.map((user) => {
              return Profile.findOne({ userId: user })
                .then((user) => {
                  let newuser = user;
                  return newuser;
                })
                .catch((err) => {
                  throwError(err, res);
                });
            })
          );
        })
        .then((list) => {
          res.status(200).json({ message: 'Success', visitorlist: list });
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
      if (user.role[0] !== 'Organizer') {
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
      res.status(200).json({ message: 'Success', event: event });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};

// Delete an event from database
exports.deleteEvent = (req, res) => {
  // Organizer only can able to delete event
  User.findById(req.userId)
    .then((user) => {
      if (user.role[0] !== 'Organizer') {
        const error = new Error('Organizer only can able to delete an event');
        error.statusCode = 401;
        throw error;
      }
      // Delete event
      return Event.findByIdAndDelete(req.params.eventId);
    })
    .then((event) => {
      res.status(200).json({ message: 'Success', event: event });
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
      return Profile.findOne({ userId: req.userId });
    })
    .then((profile) => {
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
      res.status(200).json({ message: 'Success', event: event });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};
