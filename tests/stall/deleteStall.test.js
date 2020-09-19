// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');
const Event = require('../../models/event');
const Stall = require('../../models/stall');
const Profile = require('../../models/profile');

// Importing Dummy data
const stallData = require('../dummyData/stall');
const events = require('../dummyData/event');

// Importing utility functions
const getToken = require('../utility/getToken');

// Global variables
let token;
let eventId;
let stallId;

// Run before all test cases - will connect to data base
beforeAll(async () => {
    await db.connectDB('test-deleteevent');
    const event = await new Event(events.valid[1]).save();
    eventId = event._id;
    token = await getToken();
    const stallRes = await request(app)
        .post('/api/stall/registerStall/' + eventId)
        .set('x-auth-token', token.exhibitorToken)
        .send(stallData.valid);
    stallId = stallRes.body.stall._id;
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await User.deleteMany();
    await Event.deleteMany();
    await Stall.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for delete stall
describe('Delete stall from database', () => {

    // Throw error token not present
    test('Delete stall without token', async () => {
        const res = await request(app)
            .delete(`/api/stall/deleteStall/${stallId}`);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only exhibitor can delete stall
    test('Delete stall with visitor token', async () => {
        const res = await request(app)
            .delete(`/api/stall/deleteStall/${stallId}`)
            .set('x-auth-token', token.visitorToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error - only exhibitor can delete stall
    test('Delete stall with organizer token', async () => {
        const res = await request(app)
            .delete(`/api/stall/deleteStall/${stallId}`)
            .set('x-auth-token', token.organizerToken);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Stall should delete successfuly for exhibitor token
    test('Delete stall with exhibitor token', async () => {
        const res = await request(app)
            .delete(`/api/stall/deleteStall/${stallId}`)
            .set('x-auth-token', token.exhibitorToken);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.stall.productName).toBe(stallData.valid.productName);
    });
});