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
    await db.connectDB('test-getVisitorconference');
    token = await getToken();
    const conferenceRes = await new Conference({
        ...conferenceData.valid,
        userId: token.exhibitorId,
        eventId: token.organizerId,
        registeredVisitors: [token.visitorId]
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

// Test cases for get visitor details
describe('Test cases for get visitors details', () => {

    // Throw error for request without token
    test('Should throw error for request without token', async () => {
        const res = await request(app).get('/api/conference/getvisitors/' + conferenceId);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for invalid conference id
    test('Should throw error for invalid conference id', async () => {
        const res = await request(app)
            .get('/api/conference/getvisitors/' + token.visitorId)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Failed");
    });

    // Success for valid data
    test("Should return success for valid data", async () => {
        const res = await request(app)
            .get('/api/conference/getvisitors/' + conferenceId)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.visitors.length).toBe(1);
        expect(res.body.visitors[0].userName).toBe('visitor');
    });
});