// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');

// Importing Dummy data
const users = require('../dummyData/signup');

// Global variables
let token;

// Run before all test cases - will connect to data base and register visitor account
beforeAll(async () => {
    await db.connectDB('test-getProfile');
    const res = await request(app).post('/api/user/signup').send(users.valid.visitor);
    token = res.body.token;
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await db.disconnectDB();
});

// Test cases for getProfile api
describe('All test cases for get profile route', () => {

    // Throw error if token not present
    test('Should throw error if token not present', async () => {
        const res = await request(app).get('/api/user/getProfile');
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // Send user and profile data for valid token
    test('Should send user and profile data', async () => {
        const res = await request(app)
            .get('/api/user/getProfile')
            .set('x-auth-token', token);
        expect(res.status).toBe(200);
        expect(res.body.user.userName).toBe(users.valid.visitor.userName);
        expect(res.body.profile.firstName).toBe(users.valid.visitor.firstName);
    });

});