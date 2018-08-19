const config = require("@config");

const Works = require("@models/works");

exports.createWork = async (engine, keyword, config) => {
  let work = { searchEngine: engine, keyword: keyword, page: config.page.start };

  if (config.mode) {
    for (let m in config.mode) {
      work.mode = m;
      const exist = await Works.findOne({ searchEngine: engine, keyword: keyword, mode: work.mode });
      if (!exist) await new Works(work).save();
    }
  } else {
    const exist = await Works.findOne({ searchEngine: engine, keyword: keyword });
    if (!exist) await new Works(work).save();
  }
};

exports.getAllWorks = () => {
  return Works.find({})
    .sort("updatedAt")
    .then(works => works)
    .catch(err => console.log(err));
};

exports.removeWork = async (engine, keyword, mode) => {
  return Works.findOneAndRemove({ searchEngine: engine, keyword: keyword })
    .then(result => result)
    .catch(err => err);
};

exports.removeWorkById = async id => {
  return Works.findOneAndRemove({ _id: id })
    .then(result => result)
    .catch(err => err);
};

exports.updateWorkById = async id => {
  const w = await Works.findOne({ _id: id });
  const engine = w.searchEngine;
  const c = config.engines[engine];

  return Works.findOneAndUpdate({ _id: id }, { page: w.page + c.page.count });
};
