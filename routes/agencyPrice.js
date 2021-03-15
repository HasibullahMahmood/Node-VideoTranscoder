const express = require('express');
const { body, param } = require('express-validator/check');

const controller = require('../controllers/agencyPrice');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// add agency price
router.post(
	'',
	isAuthActive,
	[
		body('contractName').trim().not().isEmpty(),
		body('agency_id').trim().not().isEmpty(),
		body('property_id').trim().not().isEmpty(),
		body('startingDate').trim().not().isEmpty(),
		body('endDate').trim().not().isEmpty(),
		body('price').trim().not().isEmpty(),
		body('currency_id').trim().not().isEmpty(),
	],
	controller.add
);

// update agency Price
router.put(
	'',
	isAuthActive,
	[
		body('id').trim().not().isEmpty(),
		body('contractName').trim().not().isEmpty(),
		body('agency_id').trim().not().isEmpty(),
		body('property_id').trim().not().isEmpty(),
		body('startingDate').trim().not().isEmpty(),
		body('endDate').trim().not().isEmpty(),
		body('price').trim().not().isEmpty(),
		body('currency_id').trim().not().isEmpty(),
	],
	controller.update
);

// post /by-conditions
router.post(
	'/by-conditions',
	isAuthActive,
	[
		body('agency_id').exists(),
		body('property_id').exists(),
		body('currency_id').exists(),
		body('checkIn').exists(),
		body('checkOut').exists(),
	],
	controller.getAllByConditions
);

// get agency prices
router.get('', isAuthActive, controller.getAgencyPrices);

// delete agency prices
router.delete('', isAuthActive, [body('id').exists()], controller.delete);

module.exports = router;
