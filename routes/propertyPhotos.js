const express = require('express');
const { body, query } = require('express-validator/check');
const multer = require('multer'); // for uploading files

const photoController = require('../controllers/propertyPhotos');
const isAuthActive = require('../middleware/isAuth&Active');
const { fileFilter, getFileStorage } = require('../util/fileMethods');

const router = express.Router();

// SAVE THE IMAGES
const uploadPhoto = multer({
	storage: getFileStorage('propertyPhotos'),
	fileFilter: fileFilter,
}).single('propertyPhoto');

//    /property-photos
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	photoController.getPhotos
);

//    /property-photos
router.post(
	'',
	isAuthActive,
	uploadPhoto,
	[body('propertyId').exists()],
	photoController.addPhoto
);

//    /property-photos
router.delete(
	'',
	isAuthActive,
	[body('photoId').exists()],
	photoController.deletePhoto
);

module.exports = router;
