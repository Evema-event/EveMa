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

// Initializing global variable
let token;

// Run before all test cases - will connect to data base and register visitor account
beforeAll(async () => {
    await db.connectDB('test-switchUser');
    token = await getToken()
});

// Run after all test cases - will delete all users and disconnect from data base
afterAll(async () => {
    await User.deleteMany();
    await Profile.deleteMany();
    await db.disconnectDB();
});

describe('Test cases for switchUser', () => {
    //Throw error for request without token
    test('Should throw error for request without token', async () => {
        const res = await request(app).post('/api/user/switchUser')
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Failed')
    })
    //Throw error for request from organizer
    test('Should throw error for request from organizer', async () => {
        const res = await request(app).post('/api/user/switchUser')
            .set('x-auth-token', token.organizerToken)
        expect(res.status).toBe(409)
        expect(res.body.message).toBe('Failed')
    })
    //Throw error for wrong password
    test('Should throw error for wrong password', async () => {
        const res = await request(app).post('/api/user/switchUser')
            .set('x-auth-token', token.visitorToken)
            .send({ password: '12345678' })
        expect(res.status).toBe(422)
        expect(res.body.message).toBe('Failed')
    })
    //Return success for valid data
    test('Should return success for valid data', async () => {
        const res = await request(app).post('/api/user/switchUser')
            .set('x-auth-token', token.visitorToken)
            .send({ password: 'visitor' })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Success')
    })
    //Throw error for request with two accounts
    test('Should throw error for request with two accounts', async () => {
        const res = await request(app).post('/api/user/switchUser')
            .set('x-auth-token', token.visitorToken)
            .send({ password: 'visitor' })
        expect(res.status).toBe(409)
        expect(res.body.message).toBe('Failed')
    })
});