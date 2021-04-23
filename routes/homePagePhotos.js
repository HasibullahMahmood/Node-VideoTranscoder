const express = require('express');
const router = express.Router();
const homePagePhotos = require('../controllers/homePagePhotos');

// /home-page-photos
router.get('', homePagePhotos.getPathes);

module.exports = router;
