const cheerio = require('cheerio');
const urldecode = require('urldecode');

const queue = require('../../databases/crawl-queue');

module.exports = async (html) => {
  const $a = cheerio.load(html)('h3.r a');

  let count = $a.length;
  let promise = [];

  if ($a.length == 0) return { success: false, count };

  $a.each((i) => {
    promise.push(new Promise(async (resolve, reject) => {
      let href = $a[i].attribs.href;
      if (/^\/url?/.test(href)) {
        href = href.substring(7);
        const result = await queue.enqueueUrl(urldecode(href.split('&')[0]));
        count += result.status;
        resolve(result.status);
      }
    }));
  });

  await Promise.all(promise);
  return { success: count ? true : false, count };
};