const express = require('express');
const { body, query } = require('express-validator/check');
const multer = require('multer'); // for uploading files

const videoController = require('../controllers/videoController');
const { fileFilter, getFileStorage } = require('../util/fileMethods');

const router = express.Router();

// SAVE THE IMAGES
const uploadVideo = multer({
	storage: getFileStorage(),
	fileFilter: fileFilter,
}).single('sourceVideo');

//    /videos
router.post(
	'',
	uploadVideo,
	// body('propertyId').exists(),
	videoController.addVideo
);

module.exports = router;
