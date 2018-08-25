const router = require("express").Router();
const Auth = require("@controllers/auth");
const Works = require("@rest/works");

router.get("/list/:page", Auth.requireAdminLogin, Works.getWorkingList);
router.delete("/:id([0-9]+)", Auth.requireAdminLogin, Works.deleteWorkingById);
router.delete("/all", Auth.requireAdminLogin, Works.deleteWorkingAll);

module.exports = router;
