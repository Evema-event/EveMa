module.exports = {
    // Valid data for signup
    valid: {
        // Organizer data for signup
        organizer: {
            userName: 'organizer',
            emailId: 'organizer@test.com',
            password: 'organizer',
            role: 'Organizer',
        },
        // Exhibitor data for signup
        exhibitor: {
            userName: 'exhibitor',
            emailId: 'exhibitor@test.com',
            password: 'exhibitor',
            role: 'Exhibitor',
            firstName: 'exhibitor-first',
            lastName: 'exhibitor-last',
            gender: 'Male',
            dateOfBirth: '2000-01-01',
            country: 'India',
            state: 'Tamilnadu',
            cityName: 'Chennai',
            zipCode: '603421',
            areaOfInterest: ['Web', 'ML'],
            designation: 'Intern',
            companyName: 'Forge',
            companyAddress: 'This is address of exhibitor working company',
            contactNumber: '1234567890'
        },
        // Visitor data for signup
        visitor: {
            userName: 'visitor',
            emailId: 'visitor@test.com',
            password: 'visitor',
            role: 'Visitor',
            firstName: 'visitor-first',
            lastName: 'visitor-last',
            gender: 'Female',
            dateOfBirth: '2000-01-01',
            country: 'India',
            state: 'Tamilnadu',
            cityName: 'Coimbatore',
            zipCode: '609491',
            areaOfInterest: ['Web', 'AI', 'IOT'],
            designation: 'Intern',
            companyName: 'Protosem',
            companyAddress: 'This is working address of visitor',
            contactNumber: '0987654321'
        }
    },
    // Invalid data for signup
    invalid: {
        // Organizer data for signup
        organizer: {
            userName: 'org',
            emailId: 'organizer@test',
            password: 'org',
            role: 'Org',
        },
        // Exhibitor data for signup
        exhibitor: {
            userName: 'exh',
            emailId: 'exhibitor@test',
            password: 'exh',
            role: 'Exh',
            firstName: 'ex',
            lastName: 'ex',
            gender: '',
            dateOfBirth: new Date(Date.now() + 5 * 24 * 3600 * 1000),
            country: 'In',
            state: 'Tn',
            cityName: 'Ch',
            zipCode: '603',
            areaOfInterest: [],
            designation: 'Int',
            companyName: 'Fo',
            companyAddress: 'This',
            contactNumber: '123'
        },
        // Visitor data for signup
        visitor: {
            userName: 'vis',
            emailId: 'visitor@test',
            password: 'vis',
            role: 'Vis',
            firstName: 'vi',
            lastName: 'vi',
            gender: '',
            dateOfBirth: new Date(Date.now() + 5 * 24 * 3600 * 1000),
            country: 'In',
            state: 'Tn',
            cityName: 'Co',
            zipCode: '609',
            areaOfInterest: [],
            designation: 'In',
            companyName: 'Pr',
            companyAddress: 'This',
            contactNumber: '0987'
        }
    }
}