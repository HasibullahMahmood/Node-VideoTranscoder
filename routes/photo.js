const express = require('express');
const { body, query } = require('express-validator/check');
const multer = require('multer'); // for uploading files

const photoController = require('../controllers/photo');
const isAuthActive = require('../middleware/isAuth&Active');
const { fileFilter, getFileStorage } = require('../util/fileMethods');

const router = express.Router();

// SAVE THE IMAGES
const uploadPhoto = multer({
	storage: getFileStorage('propertyPhotos'),
	fileFilter: fileFilter,
}).single('propertyPhoto');

//    /property-photo
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	photoController.getPhotos
);

//    /property-photo
router.post(
	'',
	isAuthActive,
	uploadPhoto,
	[body('propertyId').exists()],
	photoController.addPhoto
);

//    /property-photo
router.delete(
	'',
	isAuthActive,
	[body('photoId').exists()],
	photoController.deletePhoto
);

module.exports = router;
