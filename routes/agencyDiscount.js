const express = require('express');
const { body, param } = require('express-validator/check');

const controller = require('../controllers/agencyDiscount');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// add agency discount
router.post(
	'',
	isAuthActive,
	[
		body('discountName').trim().not().isEmpty(),
		body('agency_id').trim().not().isEmpty(),
		body('property_id').trim().not().isEmpty(),
		body('startingDate').trim().not().isEmpty(),
		body('endDate').trim().not().isEmpty(),
		body('discount').trim().not().isEmpty(),
	],
	controller.add
);

// update agency discount
router.put(
	'',
	isAuthActive,
	[
		body('id').trim().not().isEmpty(),
		body('discountName').trim().not().isEmpty(),
		body('agency_id').trim().not().isEmpty(),
		body('property_id').trim().not().isEmpty(),
		body('startingDate').trim().not().isEmpty(),
		body('endDate').trim().not().isEmpty(),
		body('discount').trim().not().isEmpty(),
	],
	controller.update
);

// get /by-conditions
router.post(
	'/by-conditions',
	isAuthActive,
	[
		body('agency_id').exists(),
		body('property_id').exists(),
		body('checkIn').exists(),
		body('checkOut').exists(),
	],
	controller.getAllByConditions
);

// get agency discounts
router.get('', isAuthActive, controller.getAgencyDiscounts);

// delete agency discounts
router.delete('', isAuthActive, [body('id').exists()], controller.delete);

module.exports = router;
