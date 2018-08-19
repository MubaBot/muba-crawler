const router = require("express").Router();
const Auth = require("@controllers/auth");
const Works = require("@rest/works");

router.put("/", Auth.requireAdminLogin, Works.reSearchKeyword);

module.exports = router;
