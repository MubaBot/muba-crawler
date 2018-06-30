var express = require('express');
var router = express.Router();

var crawlerController = require('../controller/cralwer');

// register keyword
router.get('/enable/:keyword', crawlerController.enableKeyword);

// remove keyword
router.get('/disable/:keyword', function(req, res, next) {
  res.send('test');
});

// show collected information
router.get('/lists/:keyword/:pages', function(req, res, next) {
  res.send('test');
});

module.exports = router;
