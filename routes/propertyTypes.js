const express = require('express');
const { body } = require('express-validator/check');

const propertyTypesController = require('../controllers/propertyTypes');

const router = express.Router();

// /property-types
router.get('', propertyTypesController.getPropertyTypes);

module.exports = router;
