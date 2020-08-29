module.exports = {
    // Valid data
    valid: {
        // Organizer data for login
        organizer: {
            // Data for login with username
            username: {
                userName: 'organizer',
                password: 'organizer'
            },
            // Data for login with email
            email: {
                userName: 'organizer@test.com',
                password: 'organizer'
            }
        },
        // Exhibitor data for login
        exhibitor: {
            // Data for login with username
            username: {
                userName: 'exhibitor',
                password: 'exhibitor'
            },
            // Data for login with email
            email: {
                userName: 'exhibitor@test.com',
                password: 'exhibitor'
            }
        },
        // Visitor data for login
        visitor: {
            // Data for login with username
            username: {
                userName: 'visitor',
                password: 'visitor'
            },
            // Data for login with email
            email: {
                userName: 'visitor@test.com',
                password: 'visitor'
            }
        }
    },
    // Invalid password
    invalidPassword: {
        // Organizer data for login
        organizer: {
            // Data for login with username
            username: {
                userName: 'organizer',
                password: 'organize'
            },
            // Data for login with email
            email: {
                userName: 'organizer@test.com',
                password: 'organize'
            }
        },
        // Exhibitor data for login
        exhibitor: {
            // Data for login with username
            username: {
                userName: 'exhibitor',
                password: 'exhibito'
            },
            // Data for login with email
            email: {
                userName: 'exhibitor@test.com',
                password: 'exhibito'
            }
        },
        // Visitor data for login
        visitor: {
            // Data for login with username
            username: {
                userName: 'visitor',
                password: 'visito'
            },
            // Data for login with email
            email: {
                userName: 'visitor@test.com',
                password: 'visito'
            }
        }
    },
    // invalid username
    invalidUser: {
        // Organizer data for login
        organizer: {
            // Data for login with username
            username: {
                userName: 'organize',
                password: 'organizer'
            },
            // Data for login with email
            email: {
                userName: 'organize@test.com',
                password: 'organizer'
            }
        },
        // Exhibitor data for login
        exhibitor: {
            // Data for login with username
            username: {
                userName: 'exhibito',
                password: 'exhibitor'
            },
            // Data for login with email
            email: {
                userName: 'exhibito@test.com',
                password: 'exhibitor'
            }
        },
        // Visitor data for login
        visitor: {
            // Data for login with username
            username: {
                userName: 'visito',
                password: 'visitor'
            },
            // Data for login with email
            email: {
                userName: 'visito@test.com',
                password: 'visitor'
            }
        }
    },
    // Invalid data which override validation
    invalid: {
        // Organizer data for login
        organizer: {
            // Data for login with username
            username: {
                userName: 'org',
                password: 'org'
            },
            // Data for login with email
            email: {
                userName: 'org',
                password: 'org'
            }
        },
        // Exhibitor data for login
        exhibitor: {
            // Data for login with username
            username: {
                userName: 'exh',
                password: 'exh'
            },
            // Data for login with email
            email: {
                userName: 'exh',
                password: 'exh'
            }
        },
        // Visitor data for login
        visitor: {
            // Data for login with username
            username: {
                userName: 'vis',
                password: 'vis'
            },
            // Data for login with email
            email: {
                userName: 'vis',
                password: 'vis'
            }
        }
    }
}