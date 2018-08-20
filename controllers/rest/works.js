const config = require("@config");
const works = require("@databases/works");
const queue = require("@databases/queue");

exports.getWorkingList = async (req, res, next) => {
  const page = req.params.page;
  const length = 50;
  const start = (page - 1) * length;
  const end = page * length;

  const count = await queue.getCount();
  const workings = await queue.getWorkingList(start, end);

  return res.json({ count: count, displayCount: length, lists: workings });
};

exports.reSearchKeyword = async (req, res, next) => {
  const k = req.body.keyword;
  for (let engine in config.engines) await works.createWork(engine, k, config.engines[engine]);

  return res.send({ success: 0 });
};

exports.getAllWorks = async (req, res, next) => {
  const works = await work.getAllWorks();
  return res.send(works);
};

exports.deleteWorkingById = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  return queue
    .removeUrlById(id)
    .then(result => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: 1 }));
};
