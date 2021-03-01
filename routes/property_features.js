const express = require('express');
const { body, query } = require('express-validator/check');

const property_featuresController = require('../controllers/property_features');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property_features
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	property_featuresController.getPropertyFeatures
);

// /property_features
router.put(
	'',
	isAuthActive,
	[body('propertyFeatures').exists()],
	property_featuresController.addDeleteFeatures
);

module.exports = router;
