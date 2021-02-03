const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// routes
router.get('', isAuth, userController.getData);

module.exports = router;
