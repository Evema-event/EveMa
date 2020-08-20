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
    await db.connectDB('test-verifyUser');
    await new User(users.valid.exhibitor).save();
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await db.disconnectDB();
});

// Test cases for verify user api
describe('Verify user route test cases', () => {

    // Throw error for invalid user data
    test('Should throw error for invalid data', async () => {
        const res = await request(app)
            .post('/api/user/verifyUser')
            .send(users.invalid.visitor);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(2);
    });

    // Throw error for already exist user data
    test('Should throw error for exist user data', async () => {
        const res = await request(app)
            .post('/api/user/verifyUser')
            .send(users.valid.exhibitor);
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for already exist username
    test('Should throw error for exist username', async () => {
        const res = await request(app)
            .post('/api/user/verifyUser')
            .send({
                userName: users.valid.exhibitor.userName,
                emailId: 'notexist@test.com'
            });
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for already exist email
    test('Should throw error for exist email', async () => {
        const res = await request(app)
            .post('/api/user/verifyUser')
            .send({
                userName: 'notexist',
                emailId: users.valid.exhibitor.emailId
            });
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Failed');
    });

    // Success for valid user data
    test('Should success for valid data', async () => {
        const res = await request(app)
            .post('/api/user/verifyUser')
            .send(users.valid.visitor);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
    });
});