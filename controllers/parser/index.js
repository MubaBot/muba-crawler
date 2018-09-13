const config = require("@config");
const Config = require("@databases/config");

const phantom = require("phantom");
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

const works = require("@databases/works");
const queue = require("@databases/queue");

const Search = require("./search");
const Content = require("./content");

const TYPE_CONTENT = 1;
const TYPE_SHOP = 2;

/*
 * options
 * - referer
 * - iframe
 */
exports.request = async (url, options) => {
  const instance = await phantom.create(["--ignore-ssl-errors=yes", "--load-images=no", "--webdriver-loglevel=ERROR"]).catch(err => null);
  if (instance === null) return "";

  const page = await instance.createPage().catch(err => null);
  if (page === null) return "";

  await page.on("onResourceRequested", function(requestData) {});

  const status = await page.open(url, { headers: { Referer: options.referer } }).catch(err => null);
  if (status === null) return "";

  let content = await page.property("content").catch(err => "");

  await page.close();
  await instance.exit();

  return content;
};

exports.decodeHtml = text => {
  return entities.decode(text);
};

exports.search = async (data, html) => {
  const config = await Config.getSearchConfig();
  return await Search(html, config[data.engine].tag, data.url);
};

exports.getContent = async (info, html) => {
  const c = await exports.getParserConfig(exports.makeDomainByUrl(info.url));
  if (!c) return { success: false };

  switch (c.type) {
    case TYPE_CONTENT:
      return { success: !!(await Content(c, info, html)) };
    case TYPE_SHOP:
      return { success: !!(await require("./shops/" + c.path)(c, info, html)) };
    default:
      return { success: false };
  }
};

exports.makeDomainByUrl = url => {
  return url.split("//")[1].split("/")[0];
};

exports.getSearchConfig = async engine => {
  const config = await Config.getSearchConfig();
  return config[engine];
};

async function getParserConfig(domain, getConfig, type) {
  const config = await getConfig();
  for (let d in config) {
    const r = (/^\*/.test(d) ? d.replace("*", "") : "^" + d) + "$";
    const reg = new RegExp(r);
    if (reg.test(domain)) return { type: type, ...config[d] };
  }

  return null;
}

exports.getParserConfig = async domain => {
  const content = await getParserConfig(domain, Config.getContentConfig, TYPE_CONTENT);
  if (content) return content;

  const shop = await getParserConfig(domain, Config.getShopConfig, TYPE_SHOP);
  if (shop) return shop;

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
