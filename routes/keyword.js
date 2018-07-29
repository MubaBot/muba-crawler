const router = require('express').Router();
const keyword = require('../controller/keyword');
const works = require('../controller/keyword/works');

router.get('/', keyword.all);

router.get('/works', works.getAllWorks);

router.get('/:keyword(*)', keyword.create);
// router.post('/:keyword(*)', keyword.create);

// router.get('/:keyword(*)', keyword.delete);

module.exports = router;
