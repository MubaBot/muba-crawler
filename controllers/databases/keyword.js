const Keyword = require("@models/keyword");
const Works = require("@models/works");

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
  return Keyword.aggregate([
    {
      $sort: { updatedAt: -1 }
    },
    {
      $lookup: {
        from: "works",
        localField: "keyword",
        foreignField: "keyword",
        as: "works"
      }
    },
    {
      $project: {
        _id: "$_id",
        keyword: "$keyword",
        createdAt: "$createdAt",
        worker: { $size: "$works" }
      }
    }
  ])
    .skip(start)
    .limit(end - start);
};

exports.getCount = async () => {
  return Keyword.countDocuments({});
};

exports.removeKeyword = async keyword => {
  return Keyword.remove({ keyword: keyword });
};
