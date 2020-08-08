// Importing models
const Event = require('../models/event');

// Send events that have end date today or after
exports.getUpcomingEvents = (req, res) => {
    Event.find({ endDate: { $gte: new Date(Date.now() - 24 * 3600 * 1000) } })
        .then(events => {
            return res.status(200).json({ message: 'Success', events: events });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'Failed', error: 'Server Error' });
        });
}

// Send events that have end date before today
exports.getCompletedEvents = (req, res) => {
    Event.find({ endDate: { $lt: new Date(Date.now() - 24 * 3600 * 1000) } })
        .then(events => {
            return res.status(200).json({ message: 'Success', events: events });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'Failed', error: 'Server Error' });
        });
}