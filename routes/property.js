const express = require('express');
const { body } = require('express-validator/check');

const propertyController = require('../controllers/property');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /property
router.post('', isAuthActive, propertyController.addProperty);

// /property
router.put(
	'',
	isAuthActive,
	[body('id').trim().not().isEmpty()],
	propertyController.updateProperty
);

// /property
router.delete(
	'',
	isAuthActive,
	[body('id').trim().not().isEmpty()],
	propertyController.deleteProperty
);

// /property
router.get('', isAuthActive, propertyController.getProperties);

module.exports = router;
