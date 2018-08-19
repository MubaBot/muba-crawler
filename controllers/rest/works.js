const config = require("@config");
const works = require("@databases/works");

exports.reSearchKeyword = async (req, res, next) => {
  const k = req.body.keyword;
  for (let engine in config.engines) await works.createWork(engine, k, config.engines[engine]);

  return res.send({ success: 0 });
};

exports.getAllWorks = (req, res, next) => {
  (async () => {
    const works = await work.getAllWorks();
    return res.send(works);
  })();
};
