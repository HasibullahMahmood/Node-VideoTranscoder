const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/reservation');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// add /reservation
router.post(
	'',
	isAuthActive,
	[
		body('resDate').exists(),
		body('resStatus_id').exists(),
		body('agency_id').exists(),
		body('property_id').exists(),
		body('checkIn').exists(),
		body('checkOut').exists(),
		body('name').exists(),
		body('surname').exists(),
		body('paymentMethod_id').exists(),
		body('priceType').exists(),
		body('totalPrice').exists(),
		body('currency_id').exists(),
	],
	controller.add
);

// update  /reservation
router.put(
	'',
	isAuthActive,
	[
		body('resId').exists(),
		body('resDate').exists(),
		body('resStatus_id').exists(),
		body('agency_id').exists(),
		body('property_id').exists(),
		body('checkIn').exists(),
		body('checkOut').exists(),
		body('name').exists(),
		body('surname').exists(),
		body('paymentMethod_id').exists(),
		body('priceType').exists(),
		body('totalPrice').exists(),
		body('currency_id').exists(),
	],
	controller.update
);

router.get(
	'',
	isAuthActive,
	[query('resStatus_id')],
	controller.getReservationsByResStatus
);

router.delete('', isAuthActive, [body('resId').exists()], controller.delete);

module.exports = router;
