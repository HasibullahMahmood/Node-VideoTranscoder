const express = require('express');
const { body, query } = require('express-validator/check');

const property_categoriesController = require('../controllers/property_categories');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property_categories
router.get(
	'',
	isAuthActive,
	[query('propertyId').exists()],
	property_categoriesController.getProperty_Categories
);

// /property_categories
router.put(
	'',
	isAuthActive,
	[body('property_categories').exists()],
	property_categoriesController.addDeleteCategories
);

module.exports = router;
