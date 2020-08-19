// Npm package for decoding token
const jwt = require('jsonwebtoken');

// Middleware for verify token
module.exports = (req, res, next) => {

    // Geting token from 'x-auth-token' header
    const token = req.get('x-auth-token');

    // If token not present throw error
    if (!token) {
        return res.status(401).json({ message: "Failed", error: "Token not present" });
    }

    try {
        // Decode the token if error throw error
        let decodedToken = jwt.verify(token, 'secret');

        // Set decoded result to request
        req.userId = decodedToken.userId;
        req.userName = decodedToken.userName;
        req.emailId = decodedToken.emailId;

        // Continue with pipeline
        next();

    } catch {
        return res.status(401).json({ message: "Failed", error: "Invalid token" });
    }
}