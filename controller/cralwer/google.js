const config = require('../../config').config;
const urlencode = require('urlencode');
const urldecode = require('urldecode');
const Crawler = require("crawler");

const works = require('../databases/works');
const crawlQueue = require('../databases/crawl-queue');

// var c = new Crawler({
//     maxConnections: 1,
//     callback: function (error, res, done) {
//         const url = require('url');

//         if (error) {
//             console.log(error);
//         } else {
//             var $ = res.$;
//             var $a = $('h3.r a');

//             var u = url.parse(res.options.uri);
//             var keyword = u.query.split('&')[0].split('=')[1];
//             if ($a.length == 0) {
//                 works.removeWork('google', keyword).then(() => console.log('remove success'));
//                 return;
//             }

//             $a.each((i) => {
//                 // console.log($a[i]);
//                 var href = $a[i].attribs.href
//                 if (/^\/url?/.test(href)) {
//                     href = href.substring(7);
//                     crawlQueue.enqueueUrl(urldecode(href.split('&')[0]));
//                 }
//             })

//             works.updateWork('google', keyword);
//         }
//         done();
//     }
// });

var equalJoin = (key, value) => [key, urlencode(value)].join('=');

exports.searchKeyword = (keyword, page) => {
    const googleEngine = config.engines.google;
    const url = [googleEngine.url, [equalJoin(googleEngine.query, keyword), equalJoin(googleEngine.page.param, page)].join('&')].join('?');

    c.queue(url).then((result) => result);
}

exports.search = (parser, keyword, page) => {

}