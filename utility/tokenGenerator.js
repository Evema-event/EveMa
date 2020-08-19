// Json web token package for generating token
const jwt = require('jsonwebtoken');

// Generating token with user details
module.exports = (userData) => {
    return jwt.sign(
        userData,
        'secret',
        {
            expiresIn: '6h',
        }
    );
}
