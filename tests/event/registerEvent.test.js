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
            .put('/api/event/registerEvent/' + eventId);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from exhibitor
    test('Should throw error for request from exhibitor', async () => {
        const res = await request(app)
            .put('/api/event/registerEvent/' + eventId)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from organizer
    test('Should throw error for request from organizer', async () => {
        const res = await request(app)
            .put('/api/event/registerEvent/' + eventId)
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Success for valid token
    test('Should success for request from visitor', async () => {
        const res = await request(app)
            .put('/api/event/registerEvent/' + eventId)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.event.registeredUsers.length).toBe(1);
        expect(res.body.event.registeredUsers[0]).toBe(token.visitorId);
    });

    // Throw error for more than 1 time register
    test('Should throw error for request from visitor more than once', async () => {
        const res = await request(app)
            .put('/api/event/registerEvent/' + eventId)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(422);
        expect(res.body.message).toBe("Failed");
    });
});