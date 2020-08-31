// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');
const Profile = require('../../models/profile');

// Importing Dummy data
const passwordData = require('../dummyData/resetPassword');

// Run before all test cases - will connect to data base and register users account
beforeAll(async () => {
    await db.connectDB('test-forgetPassword');
    await new User(passwordData.register.visitor).save();
    await new User(passwordData.register.exhibitor).save();
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

describe('Test cases for forgetPassword', () => {

    // Throw error invalid data
    test('Should throw error for invalid data', async () => {
        const res = await request(app)
            .put('/api/user/resetPassword')
            .send(passwordData.invalid.data);
        expect(res.status).toBe(422);
        expect(res.body.error.length).toBe(3);
    });

    // Throw error for wrong otp
    test('Should throw error wrong otp', async () => {
        const res = await request(app)
            .put('/api/user/resetPassword')
            .send(passwordData.invalid.otp);
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Failed');
    });

    // Throw error for time exceed otp
    test('Should throw error wrong otp', async () => {
        const res = await request(app)
            .put('/api/user/resetPassword')
            .send(passwordData.invalid.time);
        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Failed');
    });

    // Success for valid data
    test('Should throw error wrong otp', async () => {
        const res = await request(app)
            .put('/api/user/resetPassword')
            .send(passwordData.valid);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Success');
    });

});