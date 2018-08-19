const router = require("express").Router();
const Keyword = require("@rest/keyword");
const Auth = require("@controllers/auth");

router.get("/list/:page([0-9]+)", Auth.requireAdminLogin, Keyword.getKeywordList);
router.get("/list/all", Auth.requireAdminLogin, Keyword.getKeywordAll);
router.post("/", Auth.requireAdminLogin, Keyword.create);

module.exports = router;
