// Importing npm packages
const multer = require('multer');

// Saving files
// Path to be file stored
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let url = req.originalUrl.split('/');
        if (url[url.length - 1] === 'updateProfileImage') {
            cb(null, './public/profileImages');
        }
    },
    filename: (req, file, cb) => {
        let url = req.originalUrl.split('/');
        if (url[url.length - 1] === 'updateProfileImage') {
            let filename = Math.random().toString().slice(2, 6) + '-' + req.userName + '-' + file.originalname;
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
module.exports = multer(multerOptions).single('file');

