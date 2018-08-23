const cheerio = require("cheerio");
const urldecode = require("urldecode");

const queue = require("@databases/queue");

module.exports = async (html, referer) => {
  const $a = cheerio.load(html)("ul.list_place_col1 li.list_item span.tit_inner a.name");

  let count = 0;
  let promise = [];

  $a.each(i => {
    count++;
    promise.push(
      new Promise(async (resolve, reject) => {
        let href = $a[i].attribs.href;
        const result = await queue.enQueueUrl(urldecode(href), referer);
        count += result.status;
        resolve(result.status);
      })
    );
  });

  if ($a.length == 0) return { success: false, count };

  await Promise.all(promise);
  return { success: count ? true : false, count };
};
