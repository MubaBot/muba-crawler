const router = require("express").Router();
const Keyword = require("../controller/keyword");
const Auth = require("../controller/auth");

router.get("/", Auth.requireAdminLogin, Keyword.allKeyword);
router.post("/", Auth.requireAdminLogin, Keyword.create);

module.exports = router;
