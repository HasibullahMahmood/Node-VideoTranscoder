const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/property_notIncludedInPriceFeatures');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property_not-included-in-price-features
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	controller.getProperty_NotIncludedInPriceFeatures
);

// /property_not-included-in-price-features
router.put(
	'',
	isAuthActive,
	[body('property_notIncludedInPriceFeatures').exists()],
	controller.addDeleteFeatures
);

module.exports = router;
