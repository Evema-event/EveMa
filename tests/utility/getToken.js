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

// Global variables
let organizerToken = null;
let visitorToken = null;
let exhibitorToken = null;

let organizerId = null;
let visitorId = null;
let exhibitorId = null;

const organizer = async () => {
    const organizer = await new User({
        ...users.valid.organizer,
        password: await hashPassword(users.valid.organizer.password)
    }).save();
    organizerId = organizer._id;
    organizerToken = await tokenGenerator({
        userId: organizer._id,
        emailId: organizer.emailId,
        userName: organizer.userName
    });
};

const visitor = async () => {
    const visitor = await request(app).post('/api/user/signup').send(users.valid.visitor);
    visitorToken = visitor.body.token;
    visitorId = visitor.body.user._id;
}

const exhibitor = async () => {
    const exhibitor = await request(app).post('/api/user/signup').send(users.valid.exhibitor);
    exhibitorToken = exhibitor.body.token;
    exhibitorId = exhibitor.body.user._id;
}

const signup = async () => {
    if (organizerToken === null || organizerId === null) {
        await organizer();
    }

    if (exhibitorToken === null || exhibitorId === null) {
        await exhibitor();
    }

    if (visitorToken === null || visitorId === null) {
        await visitor();
    }
}

module.exports = async () => {
    await signup();

    let token = {
        organizerToken: organizerToken,
        visitorToken: visitorToken,
        exhibitorToken: exhibitorToken,
        organizerId: organizerId,
        visitorId: visitorId,
        exhibitorId: exhibitorId
    };

    return token;
}