const express = require('express');
const { body } = require('express-validator/check');

const controller = require('../controllers/resStatuses');

const router = express.Router();

// /reservation-statuses
router.get('', controller.getAll);

module.exports = router;
