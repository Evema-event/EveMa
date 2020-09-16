// NPM package imports
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

// Importing routes
const routes = require('./routes/routes');

// Express app
const app = express();

// Input parser
app.use(bodyParser.json());

//  Saving files
// Path to be file stored
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let url = req.originalUrl.split('/');
        if (url[url.length - 1] === 'updateProfileImage') {
            cb(null, '.\\public\\profileImages');
        }
    },
    filename: (req, file, cb) => {
        let url = req.originalUrl.split('/');
        if (url[url.length - 1] === 'updateProfileImage') {
            let filename = Math.random().toString().slice(2, 6) + '-' + Math.random().toString().slice(2, 6) + '-' + file.originalname;
            cb(null, filename);
        }
    },
});

// only image can be uploaded
let fileFilter = (req, file, cb) => {
    let type = file.mimetype.split('/');
    if (type[0] !== 'image') {
        req.error = 'Only image type can be upload';
        cb(null, false);
    } else {
        cb(null, true);
    }
};

// image size must be below 1MB
let limits = {
    fileSize: 1000000
};

// Option for storing file
let multerOptions = {
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
}

// integrating multer middleware to store files
app.use(multer(multerOptions).single('file'));

// Serving static files for production
if ((process.env.NODE_ENV || '').trim() === 'production') {
    app.use(express.static('views/build'));
}

// Serving static images and files
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