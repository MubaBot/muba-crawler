const queue = require('../../models/crawl-queue');
const cache = require('../../models/url');

exports.enqueueUrl = async (url, referer) => {

  const exist = await cache.find({ url: url });
  if (exist.length) return { status: -1 };

  return queue.findOne({ url: url }).then((already) => {
    if (already == null) {
      queue.create({ url: url, referer: referer });
      return { status: 0 };
    } else {
      return { status: -1 };
    }
  }).catch(err => console.log(err));
}

exports.dequeueUrl = () => {
  return queue.findOneAndUpdate({}, {}, { sort: 'updatedAt' }).then(url => url).catch(err => console.log(err));
}

exports.removeUrlById = (id) => {
  return queue.findOneAndRemove({ _id: id }).then(result => result).catch(err => console.log(err));
}