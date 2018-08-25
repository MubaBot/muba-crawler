const Queue = require("@models/queue");
const Cache = require("@models/url");

exports.enQueueUrl = async (url, referer) => {
  const exist = await Cache.find({ url: url });
  if (exist.length) return { status: -1 };

  return Queue.findOne({ url: url })
    .then(already => {
      if (already == null) {
        Queue.create({ url: url, referer: referer });
        return { status: 0 };
      } else {
        return { status: -1 };
      }
    })
    .catch(err => console.log(err));
};

exports.deQueueUrl = () => {
  return Queue.findOneAndUpdate({}, {}, { sort: "updatedAt" })
    .then(url => url)
    .catch(err => console.log(err));
};

exports.removeUrlById = id => {
  return Queue.findOneAndRemove({ _id: id })
    .then(result => result)
    .catch(err => console.log(err));
};

exports.removeAllUrl = () => {
  return Queue.remove({})
    .then(result => result)
    .catch(err => console.log(err));
};

exports.getCount = async () => {
  return Queue.countDocuments({});
};

exports.getWorkingList = async (start, end) => {
  return Queue.find({})
    .sort({ updatedAt: 1 })
    .skip(start)
    .limit(end - start);
};
