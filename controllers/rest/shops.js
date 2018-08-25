const Shops = require("@databases/shops");

exports.getShopList = async (req, res, next) => {
  const page = req.params.page;
  const length = 50;
  const start = (page - 1) * length;
  const end = page * length;

  const count = await Shops.getCount();
  const shops = await Shops.getShopList(start, end);

  return res.json({ count: count, displayCount: length, lists: shops });
};

exports.deleteShopById = async (req, res, next) => {
  const id = req.params.id;
  if (!id || id == "") return res.status(412).json({ success: -1 });

  return Shops.removeShopById(id)
    .then(result => res.json({ success: 0 }))
    .catch(err => res.status(500).json({ success: 1 }));
};
