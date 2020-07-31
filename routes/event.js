const express = require('express');

// Import controller
const eventController = require('../controllers/event');

const router = express.Router();

router.get('/upcomingEvents', eventController.getUpcomingEvents);
router.get('/completedEvents', eventController.getCompletedEvents);

module.exports = router;