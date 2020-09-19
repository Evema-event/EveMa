// Importing Express and create router
const express = require('express');
const router = express.Router();

//Importing validation files
const conferenceValidator = require('../validators/conference');

//Importing controllers
const conferenceController = require('../controllers/conference');

//Importing Middleware
const authenticate = require('../middleware/authenticate');
const validator = require('../middleware/validator');

/* Get - /api/conference/getConferences/{eventId}
Return conferences of specific event
*/
router.get(
  '/getConferences/:eventId',
  authenticate,
  conferenceController.getConferences
);

/* Post - /api/conference/registerConference/{eventId}
 Exhibitor can register for a conference*/
router.post(
  '/registerConference/:eventId',
  authenticate,
  conferenceValidator,
  validator,
  conferenceController.registerConference
);

/*Delete - /api/conference/deleteConference/{conferenceId}
Exhibitor can delete a conference*/
router.delete(
  '/deleteConference/:conferenceId',
  authenticate,
  conferenceController.deleteConference
)

module.exports = router;
