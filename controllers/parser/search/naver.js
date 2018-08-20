const cheerio = require("cheerio");
const urldecode = require("urldecode");

const queue = require("@databases/queue");

module.exports = async (html, referer) => {
  const $a = cheerio.load(html)("ul.type01 dt a");

  let count = 0;
  let promise = [];

  $a.each(i => {
    count++;
    promise.push(
      new Promise(async (resolve, reject) => {
        let href = $a[i].attribs.href;
        if (/cafe.naver.com/.test(href)) href = href.replace("cafe.naver.com", "m.cafe.naver.com");
        if (/blog.naver.com/.test(href)) href = href.replace("blog.naver.com", "m.blog.naver.com");
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
