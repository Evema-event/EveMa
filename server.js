// Importing server and db files
const server = require('./app');
const { connectDB } = require('./db');

// Starting Server and Mongodb
const PORT = process.env.PORT || 5000;

connectDB('eventmanagement')
    .then(() => {
        console.log('MongoDB connected');
        server.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`);
        });
    }).catch(err => {
        console.log('[MongoDB]', err);
    });
