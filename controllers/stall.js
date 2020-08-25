//Importing models
const User = require('../models/user');
const Profile = require('../models/profile');
const Stall = require('../models/stall');
const Event = require('../models/event');

//Importing throw error utility function
const throwError = require('../utility/throwError');
const { request } = require('express');

//Exhibitor can register for a stall
exports.registerStall = (req, res) => {
  let loadedStall;
  let loadedEvent;
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
        const error = new Error('Exhibitor can only register for a stall');
        error.statusCode = 401;
        throw error;
      }
      const stall = new Stall({
        productName: req.body.productName,
        description: req.body.description,
        productDomain: req.body.productDomain,
        userId: req.userId,
        eventId: req.params.eventId,
      });
      return stall.save();
    })
    .then((stall) => {
      loadedStall = stall;
      return Profile.findOne({ userId: req.userId });
    })
    .then((profile) => {
      profile.registeredStalls.push(loadedStall._id);
      return profile.save();
    })
    .then((profile) => {
      loadedEvent.registeredStalls.push(loadedStall._id);
      return loadedEvent.save();
    })
    .then((event) => {
      res.status(200).json({ message: 'Success', stall: loadedStall });
    })
    .catch((err) => {
      return throwError(err, res);
    });
};
