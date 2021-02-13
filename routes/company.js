const express = require('express');
const { body } = require('express-validator/check');
const multer = require('multer'); // for uploading files

const companyController = require('../controllers/company');
const isAuthActive = require('../middleware/isAuth&Active');
const { fileFilter, fileStorage } = require('../util/fileMethods');

const router = express.Router();

// SAVE THE IMAGES
const uploadLogo = multer({
	storage: fileStorage,
	fileFilter: fileFilter,
}).single('logoRef');

// update company
router.put(
	'',
	isAuthActive,
	uploadLogo,
	[body('name').trim().not().isEmpty()],
	companyController.update
);
// get company Info
router.get('', isAuthActive, companyController.getData);

module.exports = router;
