module.exports = [
    {
        name: 'Test 1',
        description: 'Test a event description',
        contactNumber: 11234567890,
        contactEmail: 'testa@test.com',
        price: 1120,
        startDate: Date.now() - 5 * 24 * 3600 * 1000,
        endDate: Date.now() - 3 * 24 * 3600 * 1000,
        startTime: '10:30',
        endTime: '4:30',
        venue: 'Tester 1',
        registrationLastdate: Date.now() - 7 * 24 * 3600 * 1000
    },
    {
        name: 'Test 2',
        description: 'Test 2 event description',
        contactNumber: 21234567890,
        contactEmail: 'test2@test.com',
        price: 2120,
        startDate: Date.now() + 5 * 24 * 3600 * 1000,
        endDate: Date.now() + 7 * 24 * 3600 * 1000,
        startTime: '10:30',
        endTime: '4:30',
        venue: 'Tester 2',
        registrationLastdate: Date.now() + 2 * 24 * 3600 * 1000
    }
]