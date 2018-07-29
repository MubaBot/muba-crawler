const router = require('express').Router();
const keyword = require('./keyword');

router.use('/keyword', keyword);

module.exports = router;
