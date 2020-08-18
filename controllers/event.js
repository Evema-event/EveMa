// Importing models
const Event = require('../models/event');
const User = require('../models/user');

// Send events that have end date today or after
exports.getUpcomingEvents = (req, res) => {
  Event.find({ endDate: { $gte: new Date(Date.now() - 24 * 3600 * 1000) } })
    .then((events) => {
      return res.status(200).json({ message: 'Success', events: events });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Failed', error: 'Server Error' });
    });
};

// Send events that have end date before today
exports.getCompletedEvents = (req, res) => {
  Event.find({ endDate: { $lt: new Date(Date.now() - 24 * 3600 * 1000) } })
    .then((events) => {
      return res.status(200).json({ message: 'Success', events: events });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Failed', error: 'Server Error' });
    });
};

exports.addEvent = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      if (user.role[0] !== 'Organizer') {
        const error = new Error('Organizer cannot able to add an event');
        error.statusCode = 401;
        throw error;
      }
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
      return event.save();
    })
    .then((event) => {
      res.status(200).json({ message: 'Success', event: event });
    })
    .catch((err) => {
      if (err.statusCode) {
        res
          .status(err.statusCode)
          .json({ message: 'Failed', error: err.message });
      } else {
        console.log(err);
        res.status(500).json({ message: 'Failed', error: 'Server Error' });
      }
    });
};
