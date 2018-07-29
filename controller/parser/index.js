const phantom = require('phantom');

const works = require('../databases/works');

exports.request = async (url, callback) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    // console.info('Requesting', requestData.url);
  });

  const status = await page.open(url);
  const content = await page.property('content');
  // callback(content);

  await page.close();
  await instance.exit();

  return content;
}

exports.search = async (engine, html) => {
  const search = require('./search/' + engine);
  return await search(html);
}

exports.removeOrUpdateById = (id, mode, success) => {
  switch (mode) {
    case 'LIST':
      if (success)
        works.updateWorkById(id).then(() => id);
      else
        works.removeWorkById(id).then(() => id);
    default:
  }
}
