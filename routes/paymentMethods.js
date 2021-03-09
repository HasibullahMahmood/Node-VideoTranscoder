const express = require('express');

const controller = require('../controllers/paymentMethods');

const router = express.Router();

// /payment-methods
router.get('', controller.getPaymentMethods);

module.exports = router;
