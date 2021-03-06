// Importing npm packages
const request = require('supertest');

// Importing app and db
const app = require('../../app');
const db = require('../../db');

// Importing db models
const User = require('../../models/user');
const Profile = require('../../models/profile');

// Importing utility function
const getToken = require('../utility/getToken');

// Importing Dummy data
const profileData = require('../dummyData/signup');

// Initializing global variable
let token;

// Run before all test cases - will connect to data base and register visitor account
beforeAll(async () => {
    await db.connectDB('test-updateProfile');
    token = await getToken()
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

describe('Test cases for updateProfile', () => {
    //Throw error for request without token
    test('Should throw error for request without token', async () => {
        const res = await request(app).put('/api/user/updateProfile')
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Failed')
    })
    //Throw error for invalid data
    test('Should throw error for invalid data', async () => {
        const res = await request(app).put('/api/user/updateProfile')
            .set('x-auth-token', token.visitorToken)
            .send(profileData.invalid.visitor)
        expect(res.status).toBe(422)
        expect(res.body.message).toBe('Failed')
        expect(res.body.error.length).toBe(13)
    })
    //Return success for valid data
    test('Should return success for valid data', async () => {
        const res = await request(app).put('/api/user/updateProfile')
            .set('x-auth-token', token.visitorToken)
            .send(profileData.valid.exhibitor)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Success')
        expect(res.body.profile.firstName).toBe(profileData.valid.exhibitor.firstName)
    })

});