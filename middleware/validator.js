const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const validationErrors = validationResult(req).errors;
    if (validationErrors.length > 0) {
        return res.status(422).json({ message: 'Failed', error: validationErrors });
    } else {
        next();
    }
}