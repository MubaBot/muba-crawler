const config = require("../../config");
const works = require("../databases/works");
const keyword = require("../databases/keyword");

exports.create = (req, res, next) => {
  (async () => {
    const k = req.body.keyword;
    // if exist keyword
    // return error

    for (let engine in config.engines) await works.createWork(engine, k, config.engines[engine]);
    await keyword.createKeyword(k);

    return res.send({ keyword: k });
  })();
};

exports.allKeyword = (req, res, next) => {
  (async () => {
    const keywords = await keyword.getAllKeyword();
    return res.json(keywords);
  })();
};
