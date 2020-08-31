module.exports = {
    // Valid data for reset password
    register: {
        // Exhibitor data for reset password with expired time
        exhibitor: {
            userName: 'exhibitor',
            emailId: 'exhibitor@test.com',
            password: 'exhibitor',
            role: 'Exhibitor',
            otpData: {
                expiresIn: new Date(Date.now() - 1000),
                otp: '12345'
            }
        },
        // Visitor data for reset password
        visitor: {
            userName: 'visitor',
            emailId: 'visitor@test.com',
            password: 'visitor',
            role: 'Visitor',
            otpData: {
                expiresIn: new Date(Date.now() + 5 * 60 * 1000),
                otp: '123456'
            }
        }
    },
    // valid data for reset password
    valid: {
        emailId: 'visitor@test.com',
        otp: '123456',
        password: 'visitors'
    },
    // Invalid data for reset password
    invalid: {
        data: {
            emailId: 'visitor@test',
            otp: '123',
            password: 'vis'
        },
        otp: {
            emailId: 'visitor@test.com',
            otp: '654321',
            password: 'visitors'
        },
        time: {
            emailId: 'exhibitor@test.com',
            otp: '123456',
            password: 'exhibitors'
        }
    }
}