const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/property_includedInPriceFeatures');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property-included-in-price-features
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	controller.getProperty_IncludedInPriceFeatures
);

// /property-included-in-price-features
router.put(
	'',
	isAuthActive,
	[body('property_includedInPriceFeatures').exists()],
	controller.addDeleteFeatures
);

module.exports = router;
