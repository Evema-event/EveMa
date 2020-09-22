// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const Stall = require('../../models/stall');
const User = require('../../models/user');
const Profile = require('../../models/profile');

// Importing Dummy data
const stallData = require('../dummyData/stall');

// Importing utility functions
const getToken = require('../utility/getToken');

// Global variables
let token;
let stallId;

// Run before all test cases - will create users and get token for each
beforeAll(async () => {
    await db.connectDB('test-addvisitor');
    token = await getToken();
    const stallRes = await new Stall({
        ...stallData.valid,
        userId: token.exhibitorId,
        eventId: token.organizerId
    }).save();
    stallId = stallRes._id;
});

// Run after all test cases finished 
// Delete all data we store in begining and disconnect from database
afterAll(async () => {
    await Stall.deleteMany();
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

// Test cases for visitor register conference
describe('Test cases for visitor register conference', () => {

    // Throw error for request with invalid data
    test('Should throw error for request with invalid data', async () => {
        const res = await request(app)
            .put('/api/stall/addvisitor/' + stallId)
            .send({ userId: '123124sdfaavadsd' });
        expect(res.status).toBe(422);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request with invalid stallId
    test('Should throw error for request with invalid stallId', async () => {
        const res = await request(app)
            .put('/api/stall/addvisitor/' + token.visitorId)
            .send({ userId: token.visitorId });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request with invalid userId
    test('Should throw error for request with invalid userId', async () => {
        const res = await request(app)
            .put('/api/stall/addvisitor/' + stallId)
            .send({ userId: stallId });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request with exhibitor id
    test('Should throw error for request with exhibitor id', async () => {
        const res = await request(app)
            .put('/api/stall/addvisitor/' + stallId)
            .send({ userId: token.exhibitorId });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Throw error for request with organizer id
    test('Should throw error for request with organizer id', async () => {
        const res = await request(app)
            .put('/api/stall/addvisitor/' + stallId)
            .send({ userId: token.organizerId });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Failed");
    });

    // Success for request from visitor
    test('Should success for request from visitor', async () => {
        const res = await request(app)
            .put('/api/stall/addvisitor/' + stallId)
            .send({ userId: token.visitorId });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.stall.visitors.length).toBe(1);
        expect(res.body.stall.visitors[0]).toBe(token.visitorId);
    });
});