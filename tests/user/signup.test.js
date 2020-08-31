// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');
const Profile = require('../../models/profile');

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
    await Profile.deleteMany();
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

    // Throw error for user already exist
    test('Should throw error if user already exist', async () => {
        const res = await request(app)
            .post('/api/user/signup')
            .send(users.valid.exhibitor);
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Failed');
    });

    // Except Visitor and Exhibitor role throw error
    test('Should throw error if role except Visitor and Exhibitor', async () => {
        const res = await request(app)
            .post('/api/user/signup')
            .send({
                ...users.valid.visitor,
                role: 'Someone'
            });
        expect(res.status).toBe(422);
        expect(res.body.message).toBe('Failed');
    });

    // Success for valid data and return both profile and user data and token
    test('Should success for valid data', async () => {
        const res = await request(app)
            .post('/api/user/signup')
            .send(users.valid.visitor);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(res.body.token).toBeTruthy();
        expect(res.body.user.userName).toBe(users.valid.visitor.userName);
        expect(res.body.profile.firstName).toBe(users.valid.visitor.firstName);
    });
});