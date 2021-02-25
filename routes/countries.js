const express = require('express');
const { body } = require('express-validator/check');

const controllers = require('../controllers/countries');

const router = express.Router();

// /countries
router.get('', controllers.getCoutries);

module.exports = router;
