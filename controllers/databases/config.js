const SearchConfig = require("@models/config/search");
const ContentConfig = require("@models/config/content");

exports.getAllSearchConfig = async () => {
  return SearchConfig.find({});
};

exports.createSearchConfig = async (id, name, url, query, tag, page, count, start) => {
  const exist = await SearchConfig.findOne({ $or: [{ id: id }, { name: name }, { url: url }] });
  if (exist) return Promise.reject({ success: -1 });

  return new SearchConfig({ id, name, url, query, tag, page: { param: page, count, start } }).save();
};

exports.appendSearchMode = async (_id, id, name, param, value) => {
  const c = await SearchConfig.findOne({ _id });
  if (!c) return Promise.reject({ success: -1 });

  const exist = await SearchConfig.findOne({ $and: [{ _id: _id }, { mode: { $elemMatch: { $or: [{ id }, { name }, { value }] } } }] });
  if (exist) return Promise.reject({ success: -2 });

  return SearchConfig.findOneAndUpdate({ _id }, { $push: { mode: { id, name, param, value } } });
};

exports.removeSearchConfigById = async id => {
  const exist = SearchConfig.findOne({ _id: id });
  if (!exist) return Promise.reject({ success: -1 });

  return SearchConfig.findOneAndRemove({ _id: id });
};

exports.removeModeById = async (id, mode) => {
  const exist = SearchConfig.findOne({ _id: id });
  if (!exist) return Promise.reject({ success: -1 });

  return SearchConfig.findOneAndUpdate({ _id: id }, { $pull: { mode: { id: mode } } });
};

exports.getSearchConfig = async () => {
  return exports.getAllSearchConfig().then(s => {
    let searchs = {};
    for (let i in s) {
      const e = s[i];
      let modes = {};

      for (let ii = 0; ii < e.mode.length; ii++)
        modes[e.mode[ii].id] = {
          name: e.mode[ii].name,
          param: e.mode[ii].param,
          value: e.mode[ii].value
        };

      searchs[e.id] = {
        name: e.name,
        url: e.url,
        query: e.query,
        tag: e.tag,
        page: {
          param: e.page.param,
          count: e.page.count,
          start: e.page.start
        },
        mode: modes
      };
    }

    return searchs;
  });
};

exports.getAllContentConfig = async () => {
  return ContentConfig.find({});
};

exports.createContentConfig = async (domain, title, content, comment) => {
  const exist = await ContentConfig.findOne({ domain: domain });
  if (exist) return Promise.reject({ success: -1 });

  return new ContentConfig({ domain, title, content, comment }).save();
};

exports.updateContentConfigByDomain = async (domain, title, content, comment) => {
  const exist = await ContentConfig.findOne({ domain: domain });
  if (!exist) return Promise.reject({ success: -1 });

  return ContentConfig.findOneAndUpdate({ domain }, { title, content, comment });
};

exports.removeContentConfigById = async id => {
  return ContentConfig.findOneAndRemove({ _id: id });
};

exports.getContentConfig = async () => {
  return exports.getAllContentConfig().then(parsers => {
    let configs = {};
    for (let i in parsers) {
      const c = parsers[i];

      configs[c.domain] = {
        title: c.title,
        content: c.content,
        comment: c.comment
      };
    }

    return configs;
  });
};

const config = require("@config");
exports.getShopConfig = async () => {
  return config.parser;
};
