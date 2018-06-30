var cron = require('node-cron');
var works = require('../databases/works');

var crwaler = cron.schedule('* * * * *', function () {
    console.log('start crawler');
    // run crwaler
}, false);

var started = false;

exports.startCrawler = () => { if (!started) { crwaler.start(); started = true; } };
exports.stopCrawler = () => { if (started) { crwaler.stop(); started = false; } };
exports.checkCrawler = () => {
    works.getAllWorks().then((results) => {
        if (results.length != 0) exports.startCrawler();
    }).catch(err => console.log(err));
}

exports.enableKeyword = (req, res, next) => {
    if (req.query.engine) {
        works.insertWork(req.query.engine, req.params.keyword).then((result) => {
            if (result != null) {
                exports.startCrawler();
                return res.render('success', { keyword: req.params.keyword });
            } else {
                return res.render('success', { keyword: 'already' });
            }
        });
    } else {
        works.insertWork('naver', req.params.keyword)
    }
}

exports.listKeywords = (req, res, next) => {
    return works.getAllWorks().then((results) => {
        return res.send(JSON.stringify(results));
    }).catch(err => console.log(err));
}