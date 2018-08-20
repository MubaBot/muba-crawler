const router = require("express").Router();
const Auth = require("@controllers/auth");
const Works = require("@rest/works");

router.put("/", Auth.requireAdminLogin, Works.reSearchKeyword);
router.get("/list/:page", Auth.requireAdminLogin, Works.getWorkingList);

module.exports = router;
