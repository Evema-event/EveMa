// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing models
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');
const Conference = require('../../models/conference');

// Importing dummy data
const event = require('../dummyData/event');
const users = require('../dummyData/signup');
const conference = require('../dummyData/conference');

// Declaring global variables
let token;
let eventId;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-getConferences');
    const userRes = await request(app).post('/api/user/signup').send(users.valid.exhibitor);
    token = userRes.body.token;
    const eventRes = await new Event(event.valid[1]).save();
    eventId = eventRes._id;
    await request(app)
        .post(`/api/conference/registerConference/${eventId}`)
        .send(conference.valid)
        .set('x-auth-token', token);
});

// Run after all test cases - Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
    await Conference.deleteMany();
    await db.disconnectDB();
});

// All test cases for getConference api
describe('Test cases for getConferences api', () => {

    // Throw error if token not present
    test('Should throw error if token not present', async () => {
        const res = await request(app)
            .get('/api/conference/getConferences/5f44ce10f0ff6424c008ce0d');
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for wrong event Id
    test('Should throw error for wrong event Id', async () => {
        const res = await request(app)
            .get('/api/conference/getConferences/5f44ce10f0ff6424c008ce0d')
            .set('x-auth-token', token);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Failed');
    });

    // Send conference data with profile for valid data
    test('Return conference and profile data', async () => {
        const res = await request(app)
            .get(`/api//conference/getConferences/${eventId}`)
            .set('x-auth-token', token);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.conferences.length).toBe(1);
        expect(res.body.conferences[0].name).toBe(conference.valid.name);
        expect(res.body.conferences[0].user.companyName).toBe('Forge');
    });

});

