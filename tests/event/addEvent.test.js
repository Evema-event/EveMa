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
const events = require('../dummyData/event');

// Importing utility functions
const getToken = require('../utility/getToken');

// Global variables
let token;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-addevent');
    token = await getToken();
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for add event
describe('Add Event to database', () => {

    // Throw error token not present
    test('Post Add event without token', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .send(events.valid[1]);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for wrong token
    test('Post Add event with wrong token', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', 'aldaskfjkvnaojruiendknaseoindkjaoifjdasroiehjfjdsad')
            .send(events.valid[1]);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only organizer can add event
    test('Post Add event with visitor token', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', token.visitorToken)
            .send(events.valid[1]);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only organizer can add event
    test('Post Add event with exhibitor token', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', token.exhibitorToken)
            .send(events.valid[1]);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw validation error invalid data
    test('Post Add event with invalid event data', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', token.organizerToken)
            .send(events.invalid[0]);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(11);
        expect(res.body.message).toBe('Failed');
    });

    // Event should add successfuly for valid data
    test('Post Add event with valid data', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', token.organizerToken)
            .send(events.valid[1]);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.event.name).toBe('Test 2');
    });
});