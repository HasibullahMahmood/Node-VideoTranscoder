const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/property_rules');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property-rules
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	controller.getProperty_Rules
);

// /property-rules
router.put(
	'',
	isAuthActive,
	[body('property_rules').exists()],
	controller.addDeleteRules
);

module.exports = router;
