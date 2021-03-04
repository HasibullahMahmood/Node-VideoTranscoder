const express = require('express');

const controller = require('../controllers/agency');

const router = express.Router();

// /agencies
router.get('', controller.getAgencies);

module.exports = router;
