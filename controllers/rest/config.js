const Config = require("@databases/config");

exports.getSearchConfigList = async (req, res, next) => {
  return Config.getAllSearchConfig()
    .then(result => res.json({ lists: result }))
    .catch(() => res.status(500).json({ success: 1 }));
};

exports.insertSearchConfig = async (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const url = req.body.url;
  const query = req.body.query;
  const tag = req.body.tag;
  const page = req.body.page;
  const count = req.body.count;
  const start = req.body.start;

  if (!id) return res.status(412).json({ success: -1 });
  if (!name) return res.status(412).json({ success: -2 });
  if (!url) return res.status(412).json({ success: -3 });
  if (!query) return res.status(412).json({ success: -4 });
  if (!tag) return res.status(412).json({ success: -5 });
  if (!page) return res.status(412).json({ success: -6 });
  if (!/^[\d]*$/.test(count)) return res.status(412).json({ success: -7 });
  if (!/^[\d]*$/.test(start)) return res.status(412).json({ success: -8 });

  return Config.createSearchConfig(id, name, url, query, tag, page, count, start)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: err.success === -1 ? -9 : 1 }));
};

exports.appendSearchMode = async (req, res, next) => {
  const _id = req.params.id;
  const id = req.body.id;
  const name = req.body.name;
  const param = req.body.param;
  const value = req.body.value;

  if (!id) return res.status(412).json({ success: -1 });
  if (!name) return res.status(412).json({ success: -2 });
  if (!param) return res.status(412).json({ success: -3 });
  if (!value) return res.status(412).json({ success: -4 });

  return Config.appendSearchMode(_id, id, name, param, value)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: err.success || 1 }));
};

exports.removeSearchConfig = async (req, res) => {
  const id = req.params.id;

  return Config.removeSearchConfigById(id)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ err: err, success: -1 }));
};

exports.removeMode = async (req, res) => {
  const id = req.params.id;
  const mode = req.params.mode;

  return Config.removeModeById(id, mode)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ err: err, success: -1 }));
};

exports.getContentConfigList = async (req, res, next) => {
  return Config.getAllContentConfig()
    .then(result => res.json({ lists: result }))
    .catch(() => res.status(500).json({ success: 1 }));
};

exports.insertContentConfig = async (req, res, next) => {
  const domain = req.body.domain;
  const title = req.body.title;
  const content = req.body.content;
  const comment = req.body.comment;

  if (!domain) return res.status(412).json({ success: -1 });
  if (!title) return res.status(412).json({ success: -2 });
  if (!content) return res.status(412).json({ success: -3 });
  if (!comment) return res.status(412).json({ success: -4 });

  return Config.createContentConfig(domain, title, content, comment)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: err.success === -1 ? -5 : 1 }));
};

exports.updateContentConfig = async (req, res, next) => {
  const domain = req.params.domain;
  const title = req.body.title;
  const content = req.body.content;
  const comment = req.body.comment;

  if (!domain) return res.status(412).json({ success: -1 });
  if (!title) return res.status(412).json({ success: -2 });
  if (!content) return res.status(412).json({ success: -3 });
  if (!comment) return res.status(412).json({ success: -4 });

  return Config.updateContentConfigByDomain(domain, title, content, comment)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: err.success === -1 ? -5 : 1 }));
};

exports.removeContentConfig = async (req, res) => {
  const id = req.params.id;
  return Config.removeContentConfigById(id)
    .then(() => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: err.success === -1 ? -5 : 1 }));
};
