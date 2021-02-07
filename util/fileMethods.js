const multer = require('multer'); // for uploading files
const path = require('path');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'public', 'companyLogo'));
	},
	filename: (req, file, cb) => {
		const name =
			new Date().toISOString().replace(/:/g, '-') +
			'_' +
			file.originalname;
		cb(null, name);
	},
});

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

module.exports = { fileStorage, fileFilter };
