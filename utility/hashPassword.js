// Npm package for password hashing
const bcrypt = require('bcryptjs');

// Return hashed password
module.exports = (password) => {
    return bcrypt.hash(password, 12);
}