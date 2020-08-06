// Importing npm packages
const { validationResult } = require('express-validator');

/* 
Middleware check any validation errors 
if errors exist it will quit and send errors
else continue with next action 
*/

module.exports = (req, res, next) => {

    const validationErrors = validationResult(req).errors;
    if (validationErrors.length > 0) {
        return res.status(422).json({ message: 'Failed', error: validationErrors });
    } else {
        next();
    }

}