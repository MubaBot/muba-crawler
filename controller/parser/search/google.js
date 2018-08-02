const cheerio = require('cheerio');
const urldecode = require('urldecode');

const queue = require('../../databases/crawl-queue');

module.exports = async (html) => {
  const $a = cheerio.load(html)('h3.r a');

  let count = 0;
  let promise = [];

  $a.each((i) => {
    count++;
    promise.push(new Promise(async (resolve, reject) => {
      let href = $a[i].attribs.href;
      if (/^\/url?/.test(href))
        href = href.substring(7);

      if (/^\/search/.test(href)) href = 'https://google.com' + href;
      const result = await queue.enqueueUrl(urldecode(href.split('&sa=')[0]));
      count += result.status;
      resolve(result.status);
    }));
  });

  if ($a.length == 0) return { success: false, count };

  await Promise.all(promise);
  return { success: count ? true : false, count };
};