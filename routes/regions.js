const express = require('express');
const { body } = require('express-validator/check');

const controller = require('../controllers/regions');

const router = express.Router();

// /regions
router.get('', controller.getRegions);

module.exports = router;
