// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../app');
const db = require('../db');

// Importing db models
const Event = require('../models/event');
const User = require('../models/user');

// Importing Dummy data
const events = require('./dummyData/event');
const users = require('./dummyData/signup');

// Importing utility functions
const hashPassword = require('../utility/hashPassword');
const tokenGenerator = require('../utility/tokenGenerator');

// Global variables
let organizerToken;
let visitorToken;
let exhibitorToken;

// Run before all test cases - will connect to data base and create two events
// One upcoming event and one completed event
beforeAll(async () => {
    await db.connectDB('test-event');
    await Event.create(events.valid);
    const organizer = await new User({
        ...users.organizer,
        password: await hashPassword(users.organizer.password)
    }).save();
    organizerToken = await tokenGenerator({
        userId: organizer._id,
        emailId: organizer.emailId,
        userName: organizer.userName
    });
    const visitor = await request(app).post('/api/user/signup').send(users.visitor);
    visitorToken = visitor.body.token;
    const exhibitor = await request(app).post('/api/user/signup').send(users.exhibitor);
    exhibitorToken = exhibitor.body.token;
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    await User.deleteMany();
    await db.disconnectDB();
});

// All test cases are listed below
describe('Get events from database', () => {

    // Test upcoming event is only one
    test('Get upcomingEvents', async () => {
        const res = await request(app).get('/api/event/upcomingEvents');
        expect(res.status).toBe(200);
        expect(res.body.events.length).toBe(1);
        expect(res.body.events[0].name).toBe('Test 2');
    });

    // Test completed event is only one
    test('Get completedEvents', async () => {
        const res = await request(app).get('/api/event/completedEvents');
        expect(res.status).toBe(200);
        expect(res.body.events.length).toBe(1);
        expect(res.body.events[0].name).toBe('Test 1');
    });
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
            .set('x-auth-token', visitorToken)
            .send(events.valid[1]);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only organizer can add event
    test('Post Add event with exhibitor token', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', exhibitorToken)
            .send(events.valid[1]);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw validation error invalid data
    test('Post Add event with invalid event data', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', organizerToken)
            .send(events.invalid[0]);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(11);
        expect(res.body.message).toBe('Failed');
    });

    // Event should add successfuly for valid data
    test('Post Add event with valid data', async () => {
        const res = await request(app)
            .post('/api/event/addEvent')
            .set('x-auth-token', organizerToken)
            .send(events.valid[1]);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.event.name).toBe('Test 2');
    });
});