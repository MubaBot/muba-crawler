const router = require("express").Router();

const KEYWORD = require("./keyword");
const WORKS = require("./works");
const QUEUE = require("./queue");
const CONTENTS = require("./contents");
const SHOPS = require("./shops");
const CONFIG = require("./config");

router.use("/keyword", KEYWORD);
router.use("/works", WORKS);
router.use("/queue", QUEUE);
router.use("/contents", CONTENTS);
router.use("/shops", SHOPS);
router.use("/config", CONFIG);

module.exports = router;
