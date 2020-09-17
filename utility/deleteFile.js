const fs = require('fs');
const path = require('path');

module.exports = (filepath) => {
    const rootPath = path.join(__dirname + '/../' + filepath);
    console.log(rootPath);
    fs.unlink(rootPath, (err) => {
        if (err) {
            fs.appendFile('error.txt', err + '\n', () => { });
        };
    });
}