const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/property_regions');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property-regions
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	controller.getProperty_Regions
);

// /property-regions
router.put(
	'',
	isAuthActive,
	[body('property_regions').exists()],
	controller.addDeleteRegions
);

module.exports = router;
