const express = require('express');
const { body } = require('express-validator/check');
const multer = require('multer'); // for uploading files

const companyController = require('../controllers/company');
const isAuth = require('../middleware/is-auth');
const { fileFilter, fileStorage } = require('../util/fileMethods');

const router = express.Router();

// SAVE THE IMAGES
const uploadLogo = multer({
	storage: fileStorage,
	fileFilter: fileFilter,
}).single('logoRef');

// update company
router.put('', isAuth, uploadLogo, companyController.update);
// get company Info
router.get('', isAuth, companyController.getData);

module.exports = router;
