const express = require('express');
const { body } = require('express-validator/check');

const property_featuresController = require('../controllers/property_features');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property-features
router.get(
	'',
	isAuthActive,
	[body('propertyId').exists()],
	property_featuresController.getPropertyFeatures
);

// /property-features
router.put(
	'',
	isAuthActive,
	[body('propertyFeatures').exists()],
	property_featuresController.addDeleteFeatures
);

module.exports = router;
