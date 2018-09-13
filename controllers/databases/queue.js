const URL = require("url-parse");

const Queue = require("@models/queue");
const Cache = require("@models/url");

exports.enQueueUrl = async (url, referer) => {
  if (!urlFilter(url)) return { status: -1 };

  const URL = specificUrlReplace(urlReplace(url, referer));

  const exist = await Cache.find({ url: URL });
  if (exist.length) return { status: -1 };

  return Queue.findOne({ url: URL })
    .then(already => {
      if (already == null) {
        Queue.create({ url: URL, referer: referer });
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

function urlFilter(url) {
  if (/^#$/.test(url)) return false;
  if (/^https?:\/\/www.google.co.kr\/search/.test(url)) return false;

  return true;
}

function urlReplace(url, referer) {
  if (/^\//.test(url)) return new URL(referer).origin + url;
  if (!/^https?:\/\//.test(url)) {
    const u = new URL(referer);
    let pathname = u.pathname.split("/");
    pathname[0] = u.origin;
    pathname[pathname.length - 1] = url;

    return pathname.join("/");
  }

  return url;
}

function specificUrlReplace(url) {
  if (/^https?:\/\/cafe.naver.com/.test(url)) return url.replace("://cafe.naver.com", "://m.cafe.naver.com");
  if (/^https?:\/\/blog.naver.com/.test(url)) return url.replace("://blog.naver.com", "://m.blog.naver.com");
  if (/^https?:\/\/www.google.co.kr\/url/.test(url)) return url.split("https://www.google.co.kr/url?q=")[1].split("&sa=")[0];
  if (/^https?:\/\/[a-zA-Z0-9\-]*.tistory.com\/(?!m)/.test(url)) return url.replace("tistory.com/", "tistory.com/m/");

  return url;
}
