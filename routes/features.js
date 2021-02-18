const express = require('express');
const { body } = require('express-validator/check');

const featuresController = require('../controllers/features');

const router = express.Router();

// /features
router.get('', featuresController.getFeatures);

module.exports = router;
