//Importing express and create router
const express = require('express');
const router = express.Router();

//Importing validation files
const stallValidator = require('../validators/stall');
const addVisitorValidator = require('../validators/stallAddVisitor');

//Importing controllers
const stallController = require('../controllers/stall');
const stallAddInfoController = require('../controllers/stallAddInfo');
const addVisitorController = require('../controllers/stallAddVisitor');

//Importing Middleware
const authenticate = require('../middleware/authenticate');
const saveStallFiles = require('../middleware/saveStallFiles');
const validator = require('../middleware/validator');

/* Get - /api/stall/getStalls 
Return stalls of specific event*/
router.get('/getStalls/:eventId', authenticate, stallController.getStalls);

/* Post - /api/stall/registerStall/{eventId}
 Exhibitor can register for a stall*/
router.post(
  '/registerStall/:eventId',
  authenticate,
  stallValidator,
  validator,
  stallController.registerStall
);

/*Delete - /api/stall/deleteStall/{stallId}
 Only exhibitor can delete an event*/
router.delete(
  '/deleteStall/:stallId',
  authenticate,
  stallController.deleteStall
);

/*Put - /api/stall/addinfo/{stallId}
Only exhibitor can add additional info*/
router.put(
  '/addinfo/:stallId',
  authenticate,
  saveStallFiles,
  stallAddInfoController.addInfo
);

/*Put - /api/stall/addvisitor/{stallId}
Add visitor info to stall from hardware*/
router.put(
  '/addvisitor/:stallId',
  addVisitorValidator,
  validator,
  addVisitorController.addVisitor
);

module.exports = router;
