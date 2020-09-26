// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');
const Profile = require('../../models/profile');


const getToken = require('../utility/getToken');

// Importing Dummy data
const changePasswordData = require('../dummyData/changePassword');

let token;

// Run before all test cases - will connect to data base and register visitor account
beforeAll(async () => {
    await db.connectDB('test-changePassword');
    token = await getToken()
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

describe('Test cases for forgetPassword', () => {

    // Throw error if the request is without token
    test("Should throw error for request without token", async () => {
        const res = await request(app).put('/api/user/changePassword')
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Failed')
    })
    // Throw error for invalid data
    test("Should throw error for invalid data", async () => {
        const res = await request(app).put('/api/user/changePassword')
            .set('x-auth-token', token.visitorToken)
            .send(changePasswordData.invalid)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe('Failed')
    })
    // Throw error for wrong password
    test("Should throw error for wrong password", async () => {
        const res = await request(app).put('/api/user/changePassword')
            .set('x-auth-token', token.visitorToken)
            .send(changePasswordData.invalidPassword)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe('Failed')
    })
    // Return success for valid data
    test("Should return success for valid data", async () => {
        const res = await request(app).put('/api/user/changePassword')
            .set('x-auth-token', token.visitorToken)
            .send(changePasswordData.valid)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Success')
    })

});