// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing models
const Event = require('../../models/event');
const User = require('../../models/user');
const Profile = require('../../models/profile');
const Stall = require('../../models/stall');

// Importing dummy data
const event = require('../dummyData/event');
const users = require('../dummyData/signup');
const stall = require('../dummyData/stall');

// Declaring global variables
let token;
let eventId;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-getStall');
    const userRes = await request(app).post('/api/user/signup').send(users.valid.exhibitor);
    token = userRes.body.token;
    const eventRes = await new Event(event.valid[1]).save();
    eventId = eventRes._id;
    await request(app)
        .post(`/api/stall/registerStall/${eventId}`)
        .send(stall.valid)
        .set('x-auth-token', token);
});

// Run after all test cases - Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Event.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
    await Stall.deleteMany();
    await db.disconnectDB();
});

// All test cases for getStall api
describe('Test cases for getstall api', () => {

    // Throw error if token not present
    test('Should throw error if token not present', async () => {
        const res = await request(app)
            .get('/api/stall/getStalls/5f44ce10f0ff6424c008ce0d');
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for wrong event Id
    test('Should throw error for wrong event Id', async () => {
        const res = await request(app)
            .get('/api/stall/getStalls/5f44ce10f0ff6424c008ce0d')
            .set('x-auth-token', token);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Failed');
    });

    // Send stall data with profile for valid data
    test('Return stall and profile data', async () => {
        const res = await request(app)
            .get(`/api/stall/getStalls/${eventId}`)
            .set('x-auth-token', token);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.stalls.length).toBe(1);
        expect(res.body.stalls[0].productName).toBe('test 1');
        expect(res.body.stalls[0].user.companyName).toBe('Forge');
    });

});

