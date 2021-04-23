const express = require('express');

const controller = require('../controllers/homePage_Property');

const router = express.Router();

// /home-page-properties
router.get('', controller.getProperties);

module.exports = router;
