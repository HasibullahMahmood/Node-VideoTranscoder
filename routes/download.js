const express = require('express');

const controller = require('../controllers/download');

const router = express.Router();

//    /download?folder-name=x&file-name=y
router.get('', controller.manageDownload);

module.exports = router;
