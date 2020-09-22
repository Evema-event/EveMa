// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const Conference = require('../../models/conference');
const User = require('../../models/user');
const Profile = require('../../models/profile');

// Importing Dummy data
const conferenceData = require('../dummyData/conference');

// Importing utility functions
const getToken = require('../utility/getToken');

// Global variables
let token;
let conferenceId;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-visitorconference');
    token = await getToken();
    const conferenceRes = await new Conference({
        ...conferenceData.valid,
        userId: token.exhibitorId,
        eventId: token.organizerId
    }).save();
    conferenceId = conferenceRes._id;
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Conference.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for visitor register conference
describe('Test cases for visitor register conference', () => {

    // Throw error for request without token
    test('Should throw error for request doesn\'t have token', async () => {
        const res = await request(app)
            .put('/api/conference/registerConference/' + conferenceId);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from exhibitor
    test('Should throw error for request from exhibitor', async () => {
        const res = await request(app)
            .put('/api/conference/registerConference/' + conferenceId)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from organizer
    test('Should throw error for request from organizer', async () => {
        const res = await request(app)
            .put('/api/conference/registerConference/' + conferenceId)
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Success for valid token
    test('Should success for request from visitor', async () => {
        const res = await request(app)
            .put('/api/conference/registerConference/' + conferenceId)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.conference.registeredVisitors.length).toBe(1);
        expect(res.body.conference.registeredVisitors[0]).toBe(token.visitorId);
    });

    // Throw error for more than 1 time register
    test('Should throw error for request from visitor more than once', async () => {
        const res = await request(app)
            .put('/api/conference/registerConference/' + conferenceId)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(422);
        expect(res.body.message).toBe("Failed");
    });
});