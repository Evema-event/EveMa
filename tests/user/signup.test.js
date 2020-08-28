// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');

// Importing Dummy data
const users = require('../dummyData/signup');

// Run before all test cases - will connect to data base and register exhibitor account
beforeAll(async () => {
    await db.connectDB('test-signup');
    await new User(users.valid.exhibitor).save();
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await db.disconnectDB();
});

// Test cases for signup api
describe('Signup user test cases', () => {

    // Throw error for invalid user data
    test('Should throw error for invalid data', async () => {
        const res = await request(app)
            .post('/api/user/signup')
            .send(users.invalid.visitor);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(17);
    });

});