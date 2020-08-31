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

// Run before all test cases - will connect to data base and register visitor account
beforeAll(async () => {
    await db.connectDB('test-forgetPassword');
    await new User(users.valid.visitor).save();
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

describe('Test cases for forgetPassword', () => {

    // Throw error for invalid email
    test('Should throw error if email is invalid', async () => {
        const res = await request(app)
            .post('/api/user/forgetPassword')
            .send({ emailId: 'test@test' });
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(1);
    });

    // Throw error if email not registerd
    test('Should throw error if email is not registered', async () => {
        const res = await request(app)
            .post('/api/user/forgetPassword')
            .send(users.valid.exhibitor);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Failed');
    });

    // For valid mail otp will be stored in db
    test('Should store otp in db for valid email', async () => {
        const res = await request(app)
            .post('/api/user/forgetPassword')
            .send(users.valid.visitor);
        const user = await User.findOne({ emailId: users.valid.visitor.emailId });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
        expect(user.otpData.otp).toBeTruthy();
    });
});