const router = require("express").Router();

const KEYWORD = require("./keyword");
const WORKS = require("./works");
const QUEUE = require("./queue");

router.use("/keyword", KEYWORD);
router.use("/works", WORKS);
router.use("/queue", QUEUE);

module.exports = router;
