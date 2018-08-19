const cheerio = require("cheerio");

const contents = require("@databases/contents");
const parser = require("@controllers/parser");

module.exports = async (config, url, html) => {
  const $ = cheerio.load(html);

  // const $a = $('a');
  // enqueue link

  // if ($(config.title).length == 0) console.log(url, 'Not found Titile');
  const $title = parser.decodeHtml($(config.title).html());

  if ($(config.content).length == 0) {
    /*console.log(url, '!! Not found Content !!');*/ return 0;
  }
  const $contents = parser.decodeHtml($(config.content).html());

  // if ($(config.comments).length == 0) console.log(url, 'Not found Comments');
  const $comments = parser.decodeHtml($(config.comments).html());

  return contents.createContents(url, $title, $contents, $comments).then(result => 1);
};
