const express = require('express');
const multer = require('multer'); // for uploading files

const videoController = require('../controllers/video');
const { fileFilter, getFileStorage } = require('../util/fileMethods');

const router = express.Router();

// SAVE THE VIDEOS
const uploadVideo = multer({
	storage: getFileStorage(),
	fileFilter: fileFilter,
}).single('sourceVideo');

//    /videos
router.post('', uploadVideo, videoController.manageVideo);

module.exports = router;
