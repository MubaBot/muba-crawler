const config = require("@config");
const works = require("@databases/works");
const keyword = require("@databases/keyword");

exports.create = async (req, res, next) => {
  const k = req.body.keyword;
  if (!k) return res.status(412).json({ success: -1 });

  const exist = await keyword.getKeywordByName(k);
  if (exist) return res.status(409).json({ success: -2 });

  for (let engine in config.engines) await works.createWork(engine, k, config.engines[engine]);
  await keyword.createKeyword(k);

  return res.send({ success: 0 });
};

exports.getKeywordAll = async (req, res, next) => {
  const keywords = await keyword.getKeywordAll();
  return res.json(keywords);
};

exports.getKeywordList = async (req, res, next) => {
  const page = req.params.page;
  const length = 20;
  const start = (page - 1) * length;
  const end = page * length;

  const count = await keyword.getCount();
  const keywords = await keyword.getKeywordList(start, end);

  return res.json({ count: count, displayCount: length, lists: keywords });
};

exports.deleteKeyword = async (req, res, next) => {
  const k = req.body.keyword;
  if (!k) return res.status(412).json({ success: -1 });

  await keyword.removeKeyword("afsdfajsdlkf");

  await keyword.removeKeyword(k);
  await works.removeWorkByKeyword(k);

  return res.json({ success: 0 });
};
