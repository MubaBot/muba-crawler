var cron = require('node-cron');
var works = require('../databases/works');
var crawlQueue = require('../databases/crawl-queue');

var naverBlog = require('./naver/blog');
var google = require('./google');

var crwaler = cron.schedule('* * * * *', crawling, false);

// setInterval(searchUrl, 100);

// function searchUrl() {
//     crawlQueue.dequeueUrl().then(url => {
//         if (url == null) return;
//         console.log(url)
//         // check parser
//         // if (parser ok) {
//         //     add visit site
//         //     add raw data
//         // }
//     });
// };

var crawling = () => {
    works.getAllWorks().then((ws) => {
        for (var i = 0; i < 10 && i < ws.length; i++) {
            doCawling(ws[i]);
        }
    }).catch(err => err);

}

var doCawling = (work) => {
    // console.log(work);
    var urlList = [];

    switch (work.searchEngine) {
        case 'naver':
            if (work.mode == 'blog') { naverBlog.searchKeyword(work.keyword, work.page); break; }
        case 'google':
            google.searchKeyword(work.keyword, work.page);
            break;
        default:
            return;
    }

    // if list == 0 -> remove works
    // else {
    //  enqueue
    //  update works
    // }
}

// exports.enqueueCrawler = (URL) => c.queue(URL);

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

exports.test = (req, res, next) => {
    crawling();
    return res.send('test');
}