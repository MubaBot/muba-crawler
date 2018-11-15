const Cache = require("@models/url");
const Contents = require("@models/contents");

exports.getContentList = async (start, end) => {
  return Contents.find({})
    .select("_id url title")
    .sort({ updatedAt: -1 })
    .skip(start)
    .limit(end - start);
};

exports.getContentById = async id => {
  return Contents.findOne({ _id: id }).select("content comments");
};

exports.getCount = async () => {
  return Contents.countDocuments({});
};

exports.createContents = async (url, referer, title, content, comments) => {
  const exist = await Cache.find({ url: url });
  if (exist.length) return { status: -1 };

  return Contents.create({ url: url, title: title, content: content, comments: comments })
    .then(() => Cache.create({ url: url, referer: referer }).then(() => 1))
    .catch(err => console.log("createContents Error", err));
};

exports.removeUrlById = async id => {
  return Contents.findOneAndDelete({ _id: id })
    .then(result => {
      return Cache.findOneAndDelete({ url: result.url })
        .then(result => result)
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
