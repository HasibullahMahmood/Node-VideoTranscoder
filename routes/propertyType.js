const express = require('express');
const { body } = require('express-validator/check');

const propertyTypeController = require('../controllers/propertyType');

const router = express.Router();

// /property
router.get('', propertyTypeController.getPropertyTypes);

module.exports = router;
