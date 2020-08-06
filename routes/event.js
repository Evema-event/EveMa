// Importing express and create router
const express = require('express');
const router = express.Router();

// Importing controllers
const eventController = require('../controllers/event');

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

// Exporting all routes
module.exports = router;