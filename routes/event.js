// Importing express and create router
const express = require('express');
const router = express.Router();

// Importing validation files
const eventValidator = require('../validators/event');
const notifyUsersValidator = require('../validators/notifyUsers');

// Importing controllers
const eventController = require('../controllers/event');
const notifyUsersController = require('../controllers/notifyUsers');

// Importing Middleware
const authenticate = require('../middleware/authenticate');
const validator = require('../middleware/validator');

/* 
  Get - /api/event/upcomingEvents
  Send events that have end date as today or after
*/
router.get('/upcomingEvents', eventController.getUpcomingEvents);

/* 
  Get - /api/event/completedEvents
  Send events that have end date before today 
*/
router.get('/completedEvents', eventController.getCompletedEvents);

/*
  Get - /api/event/visitorList
  Sends visitor list for that particular event
*/
router.get(
  '/visitorList/:eventId',
  authenticate,
  eventController.getVisitorList
);

/*
  Post - /api/event/addEvent
  Organizer can add event
*/
router.post(
  '/addEvent',
  authenticate,
  eventValidator,
  validator,
  eventController.addEvent
);

/*
  Delete - /api/event/deleteEvent
  Organizer can delete event
*/
router.delete(
  '/deleteEvent/:eventId',
  authenticate,
  eventController.deleteEvent
);

/*
  Put - /api/event/registerEvent
  Visitor can able to register an event
*/
router.put(
  '/registerEvent/:eventId',
  authenticate,
  eventController.registerEvent
);

router.post(
  '/notifyUsers/:eventId',
  authenticate,
  notifyUsersValidator,
  validator,
  notifyUsersController.notifyUsers
);

// Exporting all routes
module.exports = router;
