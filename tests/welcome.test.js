// Importing npm packages
const request = require('supertest');

// Import app file
const app = require('../app');
const db = require('../db');

// Importing db models
const Event = require('../models/event');

// Importing Dummy data
const events = require('./dummyData/event');

// Run before all test cases - will connect to data base and create two events
// One upcoming event and one completed event
beforeAll(async () => {
    await db.connectDB('test-welcome');
    await Event.create(events);
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    db.disconnectDB();
});

// All test cases for test the unknown route will send Hello World!!
describe('Should return Hello World!! for undefined routes in development', () => {

    // Testing / route
    test('Get /', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello World!!');
    });

    // Testing /api route
    test('Get /api', async () => {
        const res = await request(app).get('/api/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello World!!');
    });

    // Testing /api/event route
    test('Get /api/event', async () => {
        const res = await request(app).get('/api/event');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello World!!');
    });

    // Testing /api/user route
    test('Get /api/user', async () => {
        const res = await request(app).get('/api/user');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello World!!');
    });

    // Testing /api/event/upcomingEvents route
    test('Get /api/event/upcomingEvents', async () => {
        const res = await request(app).get('/api/event/upcomingEvents');
        expect(res.text).not.toBe('Hello World!!');
    });

    // Testing /api/event/completedEvents route
    test('Get /api/event/completedEvents', async () => {
        const res = await request(app).get('/api/event/completedEvents');
        expect(res.text).not.toBe('Hello World!!');
    });
});