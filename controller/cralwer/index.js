var works = require('../databases/works');

exports.enableKeyword = (req, res, next) => {
    if (req.query.engine) {
        works.insertWork(req.query.engine, req.params.keyword).then((result) => res.render('success', { keyword: req.params.keyword }));
    } else {
        works.insertWork('naver', req.params.keyword);
        works.insertWork('google', req.params.keyword);
    }
}

exports.listKeywords = (req, res, next) => {
    return works.getAllWorks().then((results) => {
        return res.send(JSON.stringify(results));
    }).catch(err => console.log(err));
}