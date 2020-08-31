// Importing models
const User = require('../models/user');
const Profile = require('../models/profile');

// Importing throw error utility function
const throwError = require('../utility/throwError');

// It will return profile of user
exports.getProfile = (req, res) => {
    let loadedUser;

    // Find the user by userId from token
    User.findById(req.userId)
        .then(user => {

            loadedUser = user;

            // Return empty profile for organizer
            if (user.role[0] === 'Organizer') {
                let profile = {};
                return profile;
            } else {
                // Find profile for exhibitor and visitor
                return Profile.findOne({ userId: req.userId });
            }

        })
        .then(profile => {
            // Return profile for exhibitor and visitor
            return res.status(200).json({ message: 'Success', user: loadedUser, profile: profile });
        })
        .catch(err => {
            return throwError(err, res);
        })
}