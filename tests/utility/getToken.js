// Importing npm packages
const request = require('supertest');

// Importing app
const app = require('../../app');

// Importing db models
const User = require('../../models/user');

// Importing Dummy data
const users = require('../dummyData/signup');

// Importing utility functions
const hashPassword = require('../../utility/hashPassword');
const tokenGenerator = require('../../utility/tokenGenerator');

module.exports = async () => {
    const organizer = await new User({
        ...users.valid.organizer,
        password: await hashPassword(users.valid.organizer.password)
    }).save();
    let organizerToken = await tokenGenerator({
        userId: organizer._id,
        emailId: organizer.emailId,
        userName: organizer.userName
    });

    const visitor = await request(app).post('/api/user/signup').send(users.valid.visitor);
    let visitorToken = visitor.body.token;

    const exhibitor = await request(app).post('/api/user/signup').send(users.valid.exhibitor);
    let exhibitorToken = exhibitor.body.token;

    let token = {
        organizerToken: organizerToken,
        visitorToken: visitorToken,
        exhibitorToken: exhibitorToken
    };
    return token;
}