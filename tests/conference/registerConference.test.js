// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');
const Event = require('../../models/event');
const Conference = require('../../models/conference');
const Profile = require('../../models/profile');

// Importing dumyData
const conferenceData = require('../dummyData/conference');
const eventData = require('../dummyData/event');

// Importing utility functions for testing
const getToken = require('../utility/getToken');

// Global variables declration
let token;
let eventId;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-registerconference');
    token = await getToken();
    const eventRes = await new Event(eventData.valid[1]).save();
    eventId = eventRes._id;
});

// Run after all test cases - Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await User.deleteMany();
    await Event.deleteMany();
    await Conference.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for register conference
describe('test cases for register conference', () => {

    // Token must be present
    test('should throw error if token not present', async () => {
        const res = await request(app).post('/api/conference/registerConference/5f44ce10f0ff6424c008ce0d');
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Error should be return for invalid data
    test('should throw error for invalid data', async () => {
        const res = await request(app)
            .post('/api/conference/registerConference/5f44ce10f0ff6424c008ce0d')
            .set('x-auth-token', token.exhibitorToken)
            .send(conferenceData.invalid);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(7);
    });

    // Throw error for invalid event
    test('should throw error for invalid event id', async () => {
        const res = await request(app)
            .post('/api/conference/registerConference/5f44ce10f0ff6424c008ce0d')
            .set('x-auth-token', token.exhibitorToken)
            .send(conferenceData.valid);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Failed");
    });

    // Visitor cannot register conference
    test('should throw error for visitor token', async () => {
        const res = await request(app)
            .post('/api/conference/registerConference/' + eventId)
            .set('x-auth-token', token.visitorToken)
            .send(conferenceData.valid);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Organizer cannot register conference
    test('should throw error for organizer token', async () => {
        const res = await request(app)
            .post('/api/conference/registerConference/' + eventId)
            .set('x-auth-token', token.organizerToken)
            .send(conferenceData.valid);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Able to register as exhibitor for valid data 
    test('should return success for valid data', async () => {
        const res = await request(app)
            .post('/api/conference/registerConference/' + eventId)
            .set('x-auth-token', token.exhibitorToken)
            .send(conferenceData.valid);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.conference.title).toBe(conferenceData.valid.title);
    });

    // Throw error for try register more than 1 conference
    test('should throw error for more than 1 confernce register', async () => {
        let res = await request(app)
            .post('/api/conference/registerConference/' + eventId)
            .set('x-auth-token', token.exhibitorToken)
            .send(conferenceData.valid);
        expect(res.status).toBe(422);
        expect(res.body.message).toBe("Failed");
    });

});
