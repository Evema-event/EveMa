// NPM package imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importing routes
const routes = require('./routes/routes');

// Express server
const server = express();

// Input parser
server.use(bodyParser.json());

// Serving static files for production
if ((process.env.NODE_ENV || '').trim() === 'production') {
    server.use(express.static('views/build'));
}

// cors middleware for development
server.use((req, res, next) => {
    if ((process.env.NODE_ENV || '').trim() !== 'production') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    }
    next();
});

// API endpoint routes
server.use('/api', routes);

// Serving Front end application
server.use('/*', (req, res) => {
    if ((process.env.NODE_ENV || '').trim() == 'production') {
        res.sendFile(__dirname + '/views/build/index.html');
    } else {
        res.send('Hello World!!');
    }
});

// Starting Server and Mongodb
const PORT = process.env.PORT || 5000;

mongoose.connect(
    'mongodb+srv://event:testevent@cluster0-dsfbd.mongodb.net/eventmanagement?retryWrites=true&w=majority',
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
        console.log(`Server start on port ${PORT}`);
    });
}).catch(err => {
    console.log('[MongoDB]', err);
});
