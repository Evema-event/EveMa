// NPM package imports
const express = require('express');
const bodyParser = require('body-parser');

// Importing routes
const routes = require('./routes/routes');

// Express app
const app = express();

// Serving static files for production
if ((process.env.NODE_ENV || '').trim() === 'production') {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"] !== "https") {
            res.redirect(302, "https://" + req.hostname + req.originalUrl);
        } else {
            next();
        }
    });
    app.use(express.static('views/build'));
};

// Input parser
app.use(bodyParser.json());

// Serving static images and files
app.use('/public', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use('/public', express.static('public'));

// cors middleware for development
app.use((req, res, next) => {
    if ((process.env.NODE_ENV || '').trim() !== 'production') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    }
    next();
});

// API endpoint routes
app.use('/api', routes);

// Serving Front end application
app.use('/*', (req, res) => {
    if ((process.env.NODE_ENV || '').trim() == 'production') {
        res.sendFile(__dirname + '/views/build/index.html');
    } else {
        res.send('Hello World!!');
    }
});

// Exporting app
module.exports = app;