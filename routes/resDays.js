const express = require('express');
const { body, query } = require('express-validator/check');

const controller = require('../controllers/resDays');
const isAuthActive = require('../middleware/isAuth&Active');

const router = express.Router();

// /res-days
router.get('', isAuthActive, [query('resId').exists()], controller.getResDays);

// /res-days
router.post(
	'',
	isAuthActive,
	[body('resDays').exists()],
	controller.addResDays
);

router.delete(
	'',
	isAuthActive,
	[body('resId').exists()],
	controller.deleteResDays
);

module.exports = router;
