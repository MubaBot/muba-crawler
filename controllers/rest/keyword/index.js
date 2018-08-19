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

exports.reWorking = async (req, res, next) => {
  const k = req.body.keyword;
  for (let engine in config.engines) await works.createWork(engine, k, config.engines[engine]);

  return res.send({ success: 0 });
};

exports.allKeyword = (req, res, next) => {
  (async () => {
    const keywords = await keyword.getAllKeyword();
    return res.json(keywords);
  })();
};
