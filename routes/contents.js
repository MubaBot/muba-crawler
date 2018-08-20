const router = require("express").Router();

const Auth = require("@controllers/auth");
const Contents = require("@rest/contents");

router.get("/list/:page", Auth.requireAdminLogin, Contents.getWorkingList);
router.get("/:id", Auth.requireAdminLogin, Contents.getContentById);

router.delete("/:id", Auth.requireAdminLogin, Contents.deleteContent);

module.exports = router;
