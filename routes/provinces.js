const express = require('express');
const { query } = require('express-validator/check');

const controllers = require('../controllers/provinces');

const router = express.Router();

// /provinces
router.get(
	'',
	[query('countryId').exists()],
	controllers.getProvincesByCountryId
);

module.exports = router;
