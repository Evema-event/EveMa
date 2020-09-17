// Importing models
const Stall = require('../models/stall');
const User = require('../models/user');

// Utility function for throwing error
const throwError = require('../utility/throwError');
const deleteFile = require('../utility/deleteFile');

const deleteFiles = (req) => {
    if (req.files && req.files.image) {
        deleteFile(req.files.image[0].path);
    }
    if (req.files && req.files.document) {
        deleteFile(req.files.document[0].path);
    }
};

exports.addInfo = (req, res) => {
    if (req.error) {
        deleteFiles(req);
        return res.status(422).json({ message: "Failed", error: req.error });
    }
    User.findById(req.userId)
        .then(user => {
            if (!user.role.includes('Exhibitor')) {
                deleteFiles(req);
                const error = new Error("Only exhibitor can add additional information");
                error.statusCode = 409;
                throw error;
            }
            return Stall.findById(req.params.stallId)
        })
        .then(stall => {
            if (stall.userId.toString() !== req.userId.toString()) {
                deleteFiles(req);
                const error = new Error("You cannot access this stall");
                error.statusCode = 409;
                throw error;
            }
            if (req.body.link) {
                if (stall.links) {
                    stall.links.push(req.body.link);
                } else {
                    stall.links = [req.body.link];
                }
            }
            if (req.files && req.files.image) {
                if (stall.images) {
                    stall.images.push(req.files.image[0].path);
                } else {
                    stall.images = [req.files.image[0].path];
                }
            }
            if (req.files && req.files.document) {
                if (stall.documents) {
                    stall.documents.push(req.files.document[0].path);
                } else {
                    stall.documents = [req.files.document[0].path];
                }
            }
            return stall.save();
        })
        .then(stall => {
            res.status(200).json({ message: "Success", stall: stall });
        })
        .catch(err => {
            throwError(err, res);
        });
}