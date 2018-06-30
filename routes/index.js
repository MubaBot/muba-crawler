var express = require('express');
var router = express.Router();

// register keyword
router.get('/enable/:keyword', function(req, res, next) {
  res.render('success', {
    keyword: req.params.keyword
  });
});

// remove keyword
router.get('/disable/:keyword', function(req, res, next) {
  res.send('test');
});

// show collected information
router.get('/lists/:keyword/:pages', function(req, res, next) {
  res.send('test');
});

module.exports = router;
