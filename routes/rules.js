const express = require('express');
const { body } = require('express-validator/check');

const rulesController = require('../controllers/rules');

const router = express.Router();

// /rules
router.get('', rulesController.getRules);

module.exports = router;
