// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');

// Importing Dummy data
const eventData = require('../dummyData/event');
const notifyUserData = require('../dummyData/notifyUser');

// Importing utility functions
const getToken = require('../utility/getToken');

// Global variables
let token;
let eventId;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-registerevent');
    token = await getToken();
    const eventRes = await new Event(eventData.valid[1]).save();
    eventId = eventRes._id;
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for register event
describe('Test cases for register event', () => {

    // Throw error for request without token
    test('Should throw error for request doesn\'t have token', async () => {
        const res = await request(app)
            .post('/api/event/notifyUsers/' + eventId);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for invalid data
    test('Should throw error for request with invalid data', async () => {
        const res = await request(app)
            .post('/api/event/notifyUsers/' + eventId)
            .set('x-auth-token', token.organizerToken)
            .send(notifyUserData.invalid);
        expect(res.status).toBe(422);
        expect(res.body.message).toBe("Failed");
        expect(res.body.error.length).toBe(3);
    });

    // Throw error for request from visitor
    test('Should throw error for request from visitor', async () => {
        const res = await request(app)
            .post('/api/event/notifyUsers/' + eventId)
            .set('x-auth-token', token.visitorToken)
            .send(notifyUserData.valid);;
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from exhibitor
    test('Should throw error for request from exhibitor', async () => {
        const res = await request(app)
            .post('/api/event/notifyUsers/' + eventId)
            .set('x-auth-token', token.exhibitorToken)
            .send(notifyUserData.valid);;
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Success for valid data
    test('Should success for request from organizer', async () => {
        const res = await request(app)
            .post('/api/event/notifyUsers/' + eventId)
            .set('x-auth-token', token.organizerToken)
            .send(notifyUserData.valid);;
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
    });
});