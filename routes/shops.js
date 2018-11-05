const router = require("express").Router();

const Auth = require("@controllers/auth");
const Shops = require("@rest/shops");

router.get("/list/:page", Auth.requireAdminLogin, Shops.getShopList);

router.post("/move", Auth.requireAdminLogin, Shops.moveShops);

router.put("/search", Auth.requireAdminLogin, Shops.reSearchShops);

router.delete("/:id", Auth.requireAdminLogin, Shops.deleteShopById);

module.exports = router;
