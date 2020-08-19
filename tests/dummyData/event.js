module.exports = {
    valid: [
        // Event data for completed event
        {
            name: 'Test 1',
            description: 'Test a event description',
            contactNumber: 11234567890,
            contactEmail: 'testa@test.com',
            price: 1120,
            startDate: new Date(Date.now() - 5 * 24 * 3600 * 1000),
            endDate: new Date(Date.now() - 3 * 24 * 3600 * 1000),
            startTime: '10:30',
            endTime: '4:30',
            venue: 'Tester 1',
            registrationLastdate: new Date(Date.now() - 7 * 24 * 3600 * 1000)
        },
        // Event data for upcomming event
        {
            name: 'Test 2',
            description: 'Test 2 event description',
            contactNumber: 21234567890,
            contactEmail: 'test2@test.com',
            price: 2120,
            startDate: new Date(Date.now() + 5 * 24 * 3600 * 1000),
            endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000),
            startTime: '10:30',
            endTime: '4:30',
            venue: 'Tester 2',
            registrationLastdate: new Date(Date.now() + 2 * 24 * 3600 * 1000)
        }
    ],
    // Invalid event data
    invalid: [
        {
            name: 'Test',
            description: 'des',
            contactNumber: 212,
            contactEmail: 'test2@test',
            price: '',
            startDate: new Date(Date.now() - 5 * 24 * 3600 * 1000),
            endDate: new Date(Date.now() - 7 * 24 * 3600 * 1000),
            startTime: '',
            endTime: '',
            venue: 'Test',
            registrationLastdate: new Date(Date.now() - 2 * 24 * 3600 * 1000)
        }
    ],
}