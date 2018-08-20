const router = require("express").Router();

const KEYWORD = require("./keyword");
const WORKS = require("./works");
const QUEUE = require("./queue");
const CONTENTS = require("./contents");

router.use("/keyword", KEYWORD);
router.use("/works", WORKS);
router.use("/queue", QUEUE);
router.use("/contents", CONTENTS);

module.exports = router;
