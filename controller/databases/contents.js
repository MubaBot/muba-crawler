const cache = require('../../models/url');
const contents = require('../../models/contents');

exports.createContents = async (url, title, content, comments) => {
  const exist = await cache.find({ url: url });
  if (exist.length) return { status: -1 };

  await cache.create({ url: url });
  return contents.create({ url: url, title: title, content: content, comments: comments }).then(result => 1).catch(err => console.log('createContents Error', err));
}