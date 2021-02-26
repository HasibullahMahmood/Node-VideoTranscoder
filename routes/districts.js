const express = require('express');
const { query } = require('express-validator/check');

const controllers = require('../controllers/districts');

const router = express.Router();

// /districts
router.get(
	'',
	[query('provinceId').exists()],
	controllers.getDistrictsByProvinceId
);

module.exports = router;
