module.exports = {
    valid: {
        title: 'test 1',
        description: 'Test is awesome one to validate our api',
        theme: 'Software',
        startTime: '9:30',
        endTime: '12:30',
        date: new Date(Date.now() + 6 * 24 * 3600 * 1000),
        seatLimit: 100
    },
    invalid: {
        title: 'tes',
        description: 'Test',
        theme: 'So',
        startTime: '',
        endTime: '',
        date: new Date(Date.now() - 6 * 24 * 3600 * 1000),
        seatLimit: 1
    }
};