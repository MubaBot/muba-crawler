var cron = require('node-cron');
var works = require('../databases/works');

var crwaler = cron.schedule('* * * * *', crwaling, false);

var crwaling = () => {
    return works.getAllWorks().then((results) => {
        // return res.send(JSON.stringify(results));
    }).catch(err => err);
}

var started = false;
exports.startCrawler = () => { if (!started) { crwaler.start(); started = true; } };
exports.stopCrawler = () => { if (started) { crwaler.stop(); started = false; } };

exports.enableKeyword = (req, res, next) => {
    if (req.query.engine) {
        works.insertWork(req.query.engine, req.params.keyword).then((result) => {
            var msg = 'error';
            switch (result.status) {
                case 0:
                    exports.startCrawler();
                    msg = req.params.keyword;
                    break;
                case -1:
                    msg = 'already';
                    break;
                case -2:
                    msg = 'invalid engine';
                    break;
            }

            return res.render('success', { keyword: msg });
        });

    } else {
        works.insertWork('naver', req.params.keyword);
    }

}

exports.listKeywords = (req, res, next) => {
    return works.getAllWorks().then((results) => {
        return res.send(JSON.stringify(results));
    }).catch(err => console.log(err));
}