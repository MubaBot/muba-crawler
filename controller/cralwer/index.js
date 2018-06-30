var cron = require('node-cron');
 
var crwaler = cron.schedule('* * * * *', function() {
    // run crwaler
}, false);

exports.startCrawler = crwaler.start();
exports.stopCrawler = crwaler.stop();

exports.enableKeyword = (req, res, next) => {
    res.send();
}