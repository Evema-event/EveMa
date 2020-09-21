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
    await db.connectDB('test-getVisitor');
    token = await getToken();
    const eventRes = await new Event({
        ...eventData.valid[1],
        registeredUsers: [
            token.visitorId
        ],
    }).save();
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

// Test cases for get visitor details
describe('Test cases for get visitors details', () => {

    // Throw error for request without token
    test('Should throw error if request doesn\'t have a token', async () => {
        const res = await request(app).get('/api/event/visitorList/' + eventId);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from visitor
    test('Should throw error if request  with visitor token', async () => {
        const res = await request(app)
            .get('/api/event/visitorList/' + eventId)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request from exhibitor
    test('Should throw error if request  with exhibitor token', async () => {
        const res = await request(app)
            .get('/api/event/visitorList/' + eventId)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error if event not present
    test('Should throw error if request  with exhibitor token', async () => {
        const res = await request(app)
            .get('/api/event/visitorList/5f44ce10f0ff6424c008ce0d')
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Failed");
    });

    // Success for valid data
    test('Should throw error if request  with organizer token', async () => {
        const res = await request(app)
            .get('/api/event/visitorList/' + eventId)
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.visitorlist.length).toBe(1);
        expect(res.body.visitorlist[0].userId).toBe(token.visitorId);
    });
});