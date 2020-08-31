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
let eventId;

// Run before all test cases - will connect to data base and create two events
// One upcoming event and one completed event
beforeAll(async () => {
    await db.connectDB('test-deleteevent');
    const event = await new Event(events.valid[1]).save();
    eventId = event._id;
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

// Test cases for delete event
describe('Delete Event from database', () => {

    // Throw error token not present
    test('Delete event without token', async () => {
        const res = await request(app)
            .delete(`/api/event/deleteEvent/${eventId}`);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for wrong token
    test('Delete event with wrong token', async () => {
        const res = await request(app)
            .delete(`/api/event/deleteEvent/${eventId}`)
            .set('x-auth-token', 'aldaskfjkvnaojruiendknaseoindkjaoifjdasroiehjfjdsad');
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });


    // Throw error - only organizer can delete event
    test('Delete event with visitor token', async () => {
        const res = await request(app)
            .delete(`/api/event/deleteEvent/${eventId}`)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only organizer can delete event
    test('Delete event with exhibitor token', async () => {
        const res = await request(app)
            .delete(`/api/event/deleteEvent/${eventId}`)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Event should delete successfuly for organizer token
    test('Delete event with organizer token', async () => {
        const res = await request(app)
            .delete(`/api/event/deleteEvent/${eventId}`)
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.event.name).toBe('Test 2');
    });
});