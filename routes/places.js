const express = require('express');

const controller = require('../controllers/places');

const router = express.Router();

// /places
router.get('', controller.getPlaces);

module.exports = router;
