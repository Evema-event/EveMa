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

/* Post - /api/stall/registerStall
 Exhibitor can register for a stall*/
router.post(
  '/registerStall/:eventId',
  authenticate,
  stallValidator,
  validator,
  stallController.registerStall
);

module.exports = router;
