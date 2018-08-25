const Shops = require("@models/shops");
const Cache = require("@models/url");

exports.getShopList = async (start, end) => {
  return Shops.find({})
    .sort({ updatedAt: -1 })
    .skip(start)
    .limit(end - start);
};

exports.getCount = async () => {
  return Shops.countDocuments({});
};

exports.createShop = async (info, name, place, times, tel, menus) => {
  const exist = await Cache.find({ url: info.url });
  if (exist.length) return false;

  let time = [];
  for (let i in times) time.push(times[i]);

  return Shops.create({
    name,
    url: info.url,
    place,
    times: time,
    tel,
    menus
  })
    .then(() => Cache.create({ url: info.url, referer: info.engine }).then(() => true))
    .catch(err => {
      console.log(err);
      return false;
    });
};

exports.removeShopById = async id => {
  return Shops.findOneAndRemove({ _id: id })
    .then(result => result)
    .catch(err => err);
};
