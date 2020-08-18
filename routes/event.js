// Importing express and create router
const express = require('express');
const router = express.Router();

//
const eventValidation = require('../validators/event');
// Importing controllers
const eventController = require('../controllers/event');

// Importing Middleware
const authenticate = require('../middleware/authenticate');
const validator = require('../middleware/validator');

/* 
  Post - /api/event/upcomingEvents
  Send events that have end date as today or after
*/
router.get('/upcomingEvents', eventController.getUpcomingEvents);

/* 
  Post - /api/event/completedEvents
  Send events that have end date before today 
*/
router.get('/completedEvents', eventController.getCompletedEvents);

router.post(
  '/addEvent',
  authenticate,
  eventValidation,
  validator,
  eventController.addEvent
);

// Exporting all routes
module.exports = router;
