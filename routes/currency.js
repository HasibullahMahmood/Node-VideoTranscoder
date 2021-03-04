const express = require('express');

const controller = require('../controllers/currency');

const router = express.Router();

// /currencies
router.get('', controller.getCurrencies);

module.exports = router;
