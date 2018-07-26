const phantom = require('phantom');

exports.parser = (url, callback) => {
    (async function () {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function (requestData) {
            console.info('Requesting', requestData.url);
        });
    
        const status = await page.open(url);
        const content = await page.property('content');
        callback(content);
    
        await instance.exit();
    })();
}

module.exports = exports.parser;