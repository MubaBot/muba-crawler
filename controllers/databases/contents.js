const Cache = require("@models/url");
const Contents = require("@models/contents");

exports.createContents = async (url, title, content, comments) => {
  const exist = await Cache.find({ url: url });
  if (exist.length) return { status: -1 };

  await Cache.create({ url: url });
  return Contents.create({ url: url, title: title, content: content, comments: comments })
    .then(result => 1)
    .catch(err => console.log("createContents Error", err));
};

exports.getCount = async () => {
  return Contents.countDocuments({});
};

exports.getContentList = async (start, end) => {
  return Contents.find({})
    .sort({ updatedAt: -1 })
    .skip(start)
    .select("_id url title")
    .limit(end - start);
};

exports.removeUrlById = async (id) => {
  return Contents.findOneAndRemove({ _id: id })
    .then(result => {
      return Cache.findOneAndRemove({ url: result.url })
        .then(result => result)
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
