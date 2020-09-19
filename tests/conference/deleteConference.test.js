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

// Importing Dummy data
const conferenceData = require('../dummyData/conference');
const events = require('../dummyData/event');

// Importing utility functions
const getToken = require('../utility/getToken');

// Global variables
let token;
let eventId;
let conferenceId;

// Run before all test cases - will connect to data base
beforeAll(async () => {
    await db.connectDB('test-deleteconference');
    const event = await new Event(events.valid[1]).save();
    eventId = event._id;
    token = await getToken();
    const conferenceRes = await request(app)
        .post('/api/conference/registerConference/' + eventId)
        .set('x-auth-token', token.exhibitorToken)
        .send(conferenceData.valid);
    conferenceId = conferenceRes.body.conference._id;
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await User.deleteMany();
    await Event.deleteMany();
    await Conference.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for delete conference
describe('Delete conference from database', () => {

    // Throw error token not present
    test('Delete conference without token', async () => {
        const res = await request(app)
            .delete(`/api/conference/deleteConference/${conferenceId}`);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only exhibitor can delete conference
    test('Delete conference with visitor token', async () => {
        const res = await request(app)
            .delete(`/api/conference/deleteConference/${conferenceId}`)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only exhibitor can delete conference
    test('Delete conference with organizer token', async () => {
        const res = await request(app)
            .delete(`/api/conference/deleteConference/${conferenceId}`)
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Conference should delete successfuly for exhibitor token
    test('Delete conference with exhibitor token', async () => {
        const res = await request(app)
            .delete(`/api/conference/deleteConference/${conferenceId}`)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.conference.title).toBe(conferenceData.valid.title);
    });
});