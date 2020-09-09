//Importing models
const User = require('../models/user');
const Profile = require('../models/profile');
const Stall = require('../models/stall');
const Event = require('../models/event');

//Importing throw error utility function
const throwError = require('../utility/throwError');
const stall = require('../validators/stall');

//Get stalls of particular event
exports.getStalls = (req, res) => {
  Event.findById(req.params.eventId)
    .populate({
      path: 'registeredStalls',
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
        event.registeredStalls.map((stall) => {
          return Profile.findOne({ userId: stall.userId._id })
            .then((profile) => {
              let newStall = {
                ...stall._doc,
                user: profile,
              };
              return newStall;
            })
            .catch((err) => {
              throwError(err, res);
            });
        })
      );
    })
    .then((stalls) => {
      res.status(200).json({ message: 'Success', stalls: stalls });
    })
    .catch((err) => {
      throwError(err, res);
    });
};

//Delete a particular stall
exports.deleteStall = (req, res) => {
  let eventId;
  User.findById(req.userId).then((user) => {
    if (user.role[0] !== 'Exhibitor') {
      const error = new Error('Only Exhibitor can delete a stall');
      error.statusCode = 401;
      throw error;
    }
    return user;
  });
  Stall.findById(req.params.stallId)
    .populate('eventId')
    .then((stall) => {
      if (!stall) {
        const error = new Error('Stall not found');
        error.statusCode = 404;
        throw error;
      }
      let currentdate = Date.now();
      let stdate = stall.eventId.startDate;
      let limitdate = new Date(
        stdate.setDate(stdate.getDate() - 2)
      ).toISOString();
      if (currentdate > limitdate) {
        const error = new Error('Time limit exceeded for deleting a stall');
        error.statusCode = 401;
        throw error;
      }
      eventId = stall.eventId._id;
      return Event.findById(stall.eventId._id);
    })
    .then((event) => {
      event.registeredStalls = event.registeredStalls.filter(
        (stallId) => stallId.toString() !== req.params.stallId.toString()
      );
      return event.save();
    })
    .then((event) => {
      return Profile.findOne({ userId: req.userId });
    })
    .then((profile) => {
      let stalls = [];
      profile.registeredStalls.forEach((stall) => {
        if (stall.eventId.toString() === eventId.toString()) {
          if (stall.stallId.length === 2) {
            stall.stallId = stall.stallId.filter(
              (stallId) => stallId.toString() !== req.params.stallId.toString()
            );
            stalls.push(stall);
          }
        } else {
          stalls.push(stall);
        }
      });
      profile.registeredStalls = stalls;
      return profile.save();
    })
    .then((profile) => {
      return Stall.findOneAndDelete(req.params.stallId);
    })
    .then((stall) => {
      res.status(200).json({ message: 'Success', stall: stall });
    })
    .catch((err) => {
      throwError(err, res);
    });
};

//Exhibitor can register for a stall
exports.registerStall = (req, res) => {
  let loadedStall;
  let loadedProfile;
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
      return Profile.findOne({ userId: req.userId });
    })
    .then((profile) => {
      loadedProfile = profile;
      if (profile.registeredStalls && profile.registeredStalls.length > 0) {
        profile.registeredStalls.forEach((event) => {
          if (
            event.eventId.toString() === req.params.eventId.toString() &&
            event.stallId.length >= 2
          ) {
            const error = new Error(
              'You can only register 2 stalls in an event'
            );
            error.statusCode = 422;
            throw error;
          }
        });
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

      if (
        !loadedProfile.registeredStalls ||
        loadedProfile.registeredStalls.length === 0
      ) {
        loadedProfile.registeredStalls = [
          {
            eventId: req.params.eventId,
            stallId: [loadedStall._id],
          },
        ];
      } else {
        let isEventIn = false;

        loadedProfile.registeredStalls = loadedProfile.registeredStalls.map(
          (event) => {
            if (event.eventId.toString() === req.params.eventId.toString()) {
              isEventIn = true;
              event.stallId.push(loadedStall._id);
            }
            return event;
          }
        );

        if (!isEventIn) {
          loadedProfile.registeredStalls.push({
            eventId: req.params.eventId,
            stallId: [loadedStall._id],
          });
        }
      }
      return loadedProfile.save();
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
