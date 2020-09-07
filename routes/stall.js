//Importing express and create router
const express = require('express');
const router = express.Router();

//Importing validation files
const stallValidator = require('../validators/stall');

//Importing controllers
const stallController = require('../controllers/stall');

//Importing Middleware
const authenticate = require('../middleware/authenticate');
const validator = require('../middleware/validator');

/* Get - /api/stall/getStalls 
Return stalls of specific event
*/
router.get('/getStalls/:eventId', authenticate, stallController.getStalls);

/* Post - /api/stall/registerStall
 Exhibitor can register for a stall*/
router.post(
  '/registerStall/:eventId',
  authenticate,
  stallValidator,
  validator,
  stallController.registerStall
);

/*Delete - /api/stall/deleteStall/{eventId}
 Only exhibitor can delete an event*/
router.delete(
  '/deleteStall/:stallId',
  authenticate,
  stallController.deleteStall
);

module.exports = router;
