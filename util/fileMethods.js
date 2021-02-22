const multer = require('multer'); // for uploading files
const path = require('path');
const fs = require('fs');

const getFileStorage = (folderName) => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '..', 'public', folderName));
		},
		filename: (req, file, cb) => {
			const name =
				new Date().toISOString().replace(/:/g, '-') +
				'_' +
				file.originalname;
			cb(null, name);
		},
	});
};

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const clearImage = (filePath) => {
	if (filePath != null) {
		filePath = path.join(__dirname, '..', 'public', filePath);
		fs.unlink(filePath, (err) => {});
	}
};

module.exports = { getFileStorage, fileFilter, clearImage };
