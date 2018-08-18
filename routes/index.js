const router = require("express").Router();
const KEYWORD = require("./keyword");

router.use("/keyword", KEYWORD);

module.exports = router;
