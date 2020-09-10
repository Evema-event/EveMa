const fs = require('fs');

module.exports = (err, res) => {
    if (err.statusCode) {
        return res
            .status(err.statusCode)
            .json({ message: 'Failed', error: err.message });
    } else {
        fs.appendFile('error.txt', err + '\n', () => { });
        return res.status(500).json({ message: 'Failed', error: 'Server Error' });
    }
}