var express = require('express');
var router = express.Router();
var crawler = require('./crawler');

var crawlerController = require('../controller/cralwer');

// register keyword
router.get('/enable/:keyword', crawlerController.enableKeyword);

// remove keyword
router.get('/disable/:keyword', function (req, res, next) { res.send('test') });

// show collected information
router.get('/lists/:pages', crawlerController.listKeywords);

// test
// router.get('/test', );

router.use('/crawler', crawler);

module.exports = router;
