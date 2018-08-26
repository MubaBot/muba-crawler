const config = require("@config");

const phantom = require("phantom");
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

const works = require("@databases/works");
const queue = require("@databases/queue");

/*
 * options
 * - referer
 * - iframe
 */
exports.request = async (url, options) => {
  const instance = await phantom.create(["--ignore-ssl-errors=yes", "--load-images=no", "--webdriver-loglevel=ERROR"]);
  const page = await instance.createPage();
  await page.on("onResourceRequested", function(requestData) {});

  const status = await page.open(url, { headers: { Referer: options.referer } }).catch(err => false);

  if (status === false) return "";

  let content = await page.property("content").catch(err => "");

  await page.close();
  await instance.exit();

  return content;
};

exports.decodeHtml = text => {
  return entities.decode(text);
};

exports.search = async (data, html) => {
  const search = require("./search/" + data.engine);
  return await search(html, data.url);
};

exports.getContent = async (info, html) => {
  const c = exports.getParserConfig(exports.makeDomainByUrl(info.url));

  if (c) {
    const getContent = require("./content/" + c.path);
    const result = await getContent(c, info, html);

    return { success: !!result };
  }

  return { success: false };
};

exports.makeDomainByUrl = url => {
  return url.split("//")[1].split("/")[0];
};

exports.getSearchConfig = engine => {
  return config.engines[engine];
};

exports.getParserConfig = domain => {
  for (let d in config.parser) {
    const r = (/^\*/.test(d) ? d.replace("*", "") : "^" + d) + "$";
    const reg = new RegExp(r);
    if (reg.test(domain)) return config.parser[d];
  }
  return null;
};

exports.removeOrUpdateById = (id, mode, s) => {
  switch (mode) {
    case "LIST":
      if (s.success) works.updateWorkById(id).then(() => id);
      else works.removeWorkById(id).then(() => id);
      break;
    case "DATA":
      if (s.success) queue.removeUrlById(id).then(() => id);
      break;
    default:
      console.log("removeOrUpdateById Error", mode);
  }
};
