const multer = require('multer'); // for uploading files
const path = require('path');
const fs = require('fs');

const getFileStorage = () => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			const companyId = req.companyId.toString();
			const propertyId = req.body.propertyId.toString();
			let imagePath = path.join(
				__dirname,
				'..',
				'public',
				'propertyPhotos',
				companyId,
				propertyId
			);

			if (!fs.existsSync(imagePath)) {
				fs.mkdirSync(imagePath, { recursive: true });
			}

			cb(null, imagePath);
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
