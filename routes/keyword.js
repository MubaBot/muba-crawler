const router = require("express").Router();
const Keyword = require("@rest/keyword");
const Auth = require("@controllers/auth");

router.get("/list/:page", Auth.requireAdminLogin, Keyword.allKeyword);
router.post("/", Auth.requireAdminLogin, Keyword.create);

module.exports = router;
