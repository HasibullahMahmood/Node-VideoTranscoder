const express = require('express');
const { body } = require('express-validator/check');

const controller = require('../controllers/notIncludedInPriceFeatures');

const router = express.Router();

// /not-included-in-price-features
router.get('', controller.getFeatures);

module.exports = router;
