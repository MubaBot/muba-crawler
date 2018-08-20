const router = require("express").Router();
const Auth = require("@controllers/auth");
const Works = require("@rest/works");

router.get("/list/:page", Auth.requireAdminLogin, Works.getWorkingList);
router.delete("/:id", Auth.requireAdminLogin, Works.deleteWorkingById);

module.exports = router;
