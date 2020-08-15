// NPM package imports
const mongoose = require('mongoose');

// Exporting function, that will take dbname as input and connect to database
exports.connectDB = (dbname) => {
    return mongoose.connect(
        `mongodb+srv://event:testevent@cluster0-dsfbd.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
}

exports.disconnectDB = () => {
    return mongoose.disconnect();
}