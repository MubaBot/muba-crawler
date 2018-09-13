const cheerio = require("cheerio");

const contents = require("@databases/contents");
const parser = require("@controllers/parser");

module.exports = async (config, info, html) => {
  const $ = cheerio.load(html);
  const url = info.url;

  if ($(config.content).length == 0) return 0;

  const $title = parser.decodeHtml($(config.title).html());
  const $contents = parser.decodeHtml($(config.content).html());
  const $comments = parser.decodeHtml($(config.comment).html());

  return contents.createContents(url, info.engine, $title, $contents, $comments).then(result => 1);
};
