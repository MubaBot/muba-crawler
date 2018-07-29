const config = require('../../config');
const works = require('../databases/works');
const keyword = require('../databases/keyword');

exports.create = (req, res, next) => {
  (async () => {
    const k = req.params.keyword;

    for (let engine in config.engines)
      await works.createWork(engine, k, config.engines[engine]);
    await keyword.createKeyword(k);

    return res.send({ keyword: k });
  })();
}

exports.all = (req, res, next) => {
  (async () => {
    const keywords = await keyword.getAllKeyword();
    return res.send(keywords);
  })();
}