const cheerio = require("cheerio");
const urldecode = require("urldecode");

const queue = require("@databases/queue");

module.exports = async (html, referer) => {
  const $a = cheerio.load(html)("dc-restaurant div.dc-restaurant-name a");

  let count = 0;
  let promise = [];

  $a.each(i => {
    count++;
    promise.push(
      new Promise(async (resolve, reject) => {
        let href = $a[i].attribs.href;
        if (href === "#") {
          count -= 1;
          return resolve(-1);
        }

        const result = await queue.enQueueUrl(urldecode("https://www.diningcode.com/" + href), referer);
        count += result.status;
        resolve(result.status);
      })
    );
  });

  if ($a.length == 0) return { success: false, count };

  await Promise.all(promise);
  return { success: count ? true : false, count };
};
