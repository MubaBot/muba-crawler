const router = require("express").Router();

const Auth = require("@controllers/auth");
const Shops = require("@rest/shops");

router.get("/list/:page", Auth.requireAdminLogin, Shops.getShopList);

router.put("/move", Auth.requireAdminLogin, Shops.moveShops);

router.delete("/:id", Auth.requireAdminLogin, Shops.deleteShopById);

module.exports = router;
