// Importing npm packages
const multer = require('multer');

//  Saving files
// Path to be file stored
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, './public/stallImages');
        } else if (file.fieldname === 'document') {
            cb(null, './public/stallDocuments')
        }
    },
    filename: (req, file, cb) => {
        let filename = Math.random().toString().slice(2, 6) + '-' + Date.now() + '-' + file.originalname;
        cb(null, filename);
    },
});

// only image can be uploaded
let fileFilter = (req, file, cb) => {
    let type = file.mimetype.split('/');
    if (file.fieldname === 'image' && type[0] !== 'image') {
        if (req.error) {
            req.error.push('Only image type can be upload for image field');
        } else {
            req.error = ['Only image type can be upload for image field']
        }
        cb(null, false);
    } else if (file.fieldname === 'document' && file.mimetype === 'application/x-msdos-program') {
        if (req.error) {
            req.error.push('Only pdf like type can be upload for document field');
        } else {
            req.error = ['Only pdf like type can be upload for document field'];
        }
        cb(null, false);
    } else if (file.fieldname === 'document' && type[0] !== 'application' && type[0] !== 'text') {
        if (req.error) {
            req.error.push('Only pdf like type can be upload for document field');
        } else {
            req.error = ['Only pdf like type can be upload for document field'];
        }
        cb(null, false);
    } else {
        cb(null, true);
    }
};

// document size must be below 1MB
let limits = {
    fileSize: 5000000
};

// Option for storing file
let multerOptions = {
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
}

// Options for multiple files to be handled
let files = [
    {
        name: "document",
        maxCount: 1
    },
    {
        name: "image",
        maxCount: 1
    }
];

// exporting multer middleware to store files
module.exports = multer(multerOptions).fields(files);