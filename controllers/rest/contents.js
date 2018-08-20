const Contents = require("@databases/contents");

exports.getWorkingList = async (req, res, next) => {
  const page = req.params.page;
  const length = 50;
  const start = (page - 1) * length;
  const end = page * length;

  const count = await Contents.getCount();
  const contents = await Contents.getContentList(start, end);

  return res.json({ count: count, displayCount: length, lists: contents });
};

exports.getContentById = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  return Contents.getContentById(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ success: 1 }));
};

exports.deleteContent = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  return Contents.removeUrlById(id)
    .then(result => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: 1 }));
};
