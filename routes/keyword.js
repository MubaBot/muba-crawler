const router = require("express").Router();
const Keyword = require("@rest/keyword");
const Auth = require("@controllers/auth");

router.get("/list/:page([0-9]+)", Auth.requireAdminLogin, Keyword.getKeywordList);
router.get("/list/all", Auth.requireAdminLogin, Keyword.getKeywordAll);
// router.get("/works",

router.post("/", Auth.requireAdminLogin, Keyword.create);
router.delete("/", Auth.requireAdminLogin, Keyword.deleteKeyword);

module.exports = router;
