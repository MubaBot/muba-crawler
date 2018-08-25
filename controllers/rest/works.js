const Config = require("@config");
const Works = require("@databases/works");
const Queue = require("@databases/queue");

exports.getWorkingList = async (req, res, next) => {
  const page = req.params.page;
  const length = 50;
  const start = (page - 1) * length;
  const end = page * length;

  const count = await Queue.getCount();
  const workings = await Queue.getWorkingList(start, end);

  return res.json({ count: count, displayCount: length, lists: workings });
};

exports.reSearchKeyword = async (req, res, next) => {
  const k = req.body.keyword;
  for (let engine in Config.engines) await Works.createWork(engine, k, Config.engines[engine]);

  return res.send({ success: 0 });
};

exports.getAllWorks = async (req, res, next) => {
  const works = await Works.getAllWorks();
  return res.send(works);
};

exports.deleteWorkingById = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  return Queue.removeUrlById(id)
    .then(result => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: 1 }));
};

exports.deleteWorkingAll = async (req, res, next) => {
  return Queue.removeAllUrl()
    .then(result => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: 1 }));
};
