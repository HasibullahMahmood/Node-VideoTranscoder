const express = require('express');
const controller = require('../controllers/stream');
const router = express.Router();

//    /stream?folder-name=x&file-name=y
router.get('', controller.manageStream);

module.exports = router;
