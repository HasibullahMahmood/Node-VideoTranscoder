const express = require('express');

const controller = require('../controllers/categories');

const router = express.Router();

// /categories
router.get('', controller.getCategories);

module.exports = router;
