const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/property_places');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property_places
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	controller.getProperty_Places
);

// /property_places
router.put(
	'',
	isAuthActive,
	[body('property_places').exists()],
	controller.addUpdatePlaces
);

module.exports = router;
