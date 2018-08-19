const router = require("express").Router();
const KEYWORD = require("./keyword");
const WORKS = require("./works");

router.use("/keyword", KEYWORD);
router.use("/works", WORKS);

module.exports = router;
