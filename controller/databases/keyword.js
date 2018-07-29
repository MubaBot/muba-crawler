const Keyword = require('../../models/keyword');

exports.createKeyword = async (keyword) => {
  return await new Keyword({ keyword: keyword }).save().catch(err => err);
}

exports.getAllKeyword = async () => {
  const keywords = Keyword.find({}).sort('updatedAt');
  return keywords;
}