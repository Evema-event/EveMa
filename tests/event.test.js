// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../app');
const db = require('../db');

// Importing db models
const Event = require('../models/event');

// Importing Dummy data
const events = require('./dummyData/event');

// Run before all test cases - will connect to data base and create two events
// One upcoming event and one completed event
beforeAll(async () => {
    await db.connectDB('test-event');
    await Event.create(events);
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    db.disconnectDB();
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