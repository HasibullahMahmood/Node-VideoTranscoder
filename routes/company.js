const express = require('express');
const { body } = require('express-validator/check');

const companyController = require('../controllers/company');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// update company
router.put('', isAuth, companyController.update);

module.exports = router;
