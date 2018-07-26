var works = require('../databases/works');
var queues = require('../databases/crawl-queue');

var google = require('../cralwer/google');

var parser = require('../parser');

var pm2 = require('./pm2');

function crawling() {
    works.getAllWorks().then((ws) => {
        // for (var i = 0; ws.length; i++) doCawling(ws[i]);
    });
}

var doCawling = (work) => {
    // parser()
    switch (work.searchEngine) {
        // case 'naver':
        //     if (work.mode == 'blog') { naverBlog.searchKeyword(work.keyword, work.page); break; }
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

