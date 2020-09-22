// Importing database models
const User = require('../models/user');
const Stall = require('../models/stall');

// Importing utility functions
const throwError = require('../utility/throwError');

// Exporting add visitor function
exports.addVisitor = (req, res) => {
    let loadedStall;
    Stall.findById(req.params.stallId)
        .then(stall => {
            if (!stall) {
                const error = new Error("Stall not found");
                error.statusCode = 404;
                throw error;
            }
            loadedStall = stall;
            return User.findById(req.body.userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                throw error;
            }
            if (!user.role.includes('Visitor')) {
                const error = new Error("User must be a visitor");
                error.statusCode = 422;
                throw error;
            }
            if (loadedStall.visitors) {
                if (!loadedStall.visitors.includes(req.body.userId)) {
                    loadedStall.visitors.push(req.body.userId);
                }
            } else {
                loadedStall.visitors = [req.body.userId];
            }
            return loadedStall.save();
        })
        .then(stall => {
            res.status(200).json({ message: "Success", stall: stall });
        })
        .catch(err => {
            throwError(err, res);
        });
};