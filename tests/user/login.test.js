// Importing supertest for testing
const request = require('supertest');

// Importing app and db files
const app = require('../../app');
const db = require('../../db');

// Importing models
const User = require('../../models/user');

// Importing dummy data
const users = require('../dummyData/signup');
const loginData = require('../dummyData/login');

// Run before all test cases - connect to db and signup a user
beforeAll(async () => {
    await db.connectDB('test-login');
    await request(app).post('/api/user/signup').send(users.valid.exhibitor);
});

// Run after all test cases - delete all data we added to db and disconnect from db
afterAll(async () => {
    await User.deleteMany();
    await db.disconnectDB();
});

// All the login test cases
describe('Test cases for login user', () => {

    // Throw error for invalid data
    test('Should throw error if data is invalid', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send(loginData.invalid.visitor.username);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(2);
    });

    // Throw error if user not found
    test('Should throw error if user not found', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send(loginData.valid.visitor.username);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for wrong password
    test('Should throw error if password is wrong', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send(loginData.invalidPassword.exhibitor.username);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Failed');
    });

    // For valid data send user and profile info with token
    test('Should return user and profile info with token for valid data', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send(loginData.valid.exhibitor.email);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.token).toBeTruthy();
        expect(res.body.user.userName).toBe(users.valid.exhibitor.userName);
        expect(res.body.profile.firstName).toBe(users.valid.exhibitor.firstName);
    });

});