const express = require('express');
const { body } = require('express-validator/check');

const includedInPriceFeaturesController = require('../controllers/includedInPriceFeatures');

const router = express.Router();

// /included-in-price-features
router.get('', includedInPriceFeaturesController.getFeatures);

module.exports = router;
