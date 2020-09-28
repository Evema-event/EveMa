// Importing database models
const User = require('../models/user');
const Profile = require('../models/profile');
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
                error.statusCode = 401;
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
            return Profile.findOne({ userId: req.body.userId });
        })
        .then(profile => {
            if (profile.visitedStalls) {
                if (!profile.visitedStalls.includes(req.params.stallId)) {
                    profile.visitedStalls.push(req.params.stallId);
                }
            } else {
                profile.visitedStalls = [req.params.stallId];
            }
            return profile.save();
        })
        .then(profile => {
            res.status(200).json({ message: "Success", stall: loadedStall });
        })
        .catch(err => {
            throwError(err, res);
        });
};

// Send visitor list for an stall
exports.getVisitors = (req, res) => {
    Stall.findById(req.params.stallId)
        .populate('visitors')
        .then((stall) => {
            if (!stall) {
                const error = new Error("Stall not found");
                error.statusCode = 404;
                throw error;
            }
            return Promise.all(
                stall.visitors.map(visitor => {
                    return Profile.findOne({
                        userId: visitor._id
                    })
                        .then((profile) => {
                            let newvisitor = {
                                ...profile._doc,
                                emailId: visitor.emailId,
                                userName: visitor.userName,
                            };
                            return newvisitor;
                        })
                        .catch((err) => {
                            throw err;
                        });
                })
            );
        })
        .then((list) => {
            res.status(200).json({
                message: 'Success',
                visitors: list
            });
        })
        .catch((err) => {
            throwError(err, res);
        });
};