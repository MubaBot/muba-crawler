var cron = require('node-cron');
var works = require('../databases/works');

var crwaler = cron.schedule('* * * * *', function () {
    // run crwaler
}, false);

exports.startCrawler = crwaler.start();
exports.stopCrawler = crwaler.stop();

exports.enableKeyword = (req, res, next) => {
    if (req.query.engine) {
        cron.insertWork('naver', req.params.keyword).then((result) => {
            if (keyword) {
                return res.render('success', req.params.keyword);
            } else {
                return res.render('success', 'already');
            }
        });
    } else {
        cron.insertWork('naver', req.params.keyword)
    }
}