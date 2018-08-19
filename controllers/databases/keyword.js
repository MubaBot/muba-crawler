const Keyword = require("@models/keyword");

exports.createKeyword = async keyword => {
  return await new Keyword({ keyword: keyword }).save().catch(err => err);
};

exports.getKeywordAll = async () => {
  const keywords = Keyword.find({}, "keyword createdAt").sort("updatedAt");
  return keywords;
};

exports.getKeywordByName = async keyword => {
  return Keyword.findOne({ keyword: keyword });
};

exports.getKeywordList = async (start, end) => {
  return Keyword.find({})
    .skip(start)
    .limit(end - start)
    .sort({ updatedAt: -1 });
};

exports.getCount = async () => {
  return Keyword.count({});
};
