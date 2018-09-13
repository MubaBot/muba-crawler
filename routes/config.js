const router = require("express").Router();

const Auth = require("@controllers/auth");
const Config = require("@rest/config");

router.get("/search", Auth.requireAdminLogin, Config.getSearchConfigList);

router.post("/search", Auth.requireAdminLogin, Config.insertSearchConfig);
router.post("/search/:id", Auth.requireAdminLogin, Config.appendSearchMode);

router.delete("/search/:id", Auth.requireAdminLogin, Config.removeSearchConfig);
router.delete("/search/:id/:mode", Auth.requireAdminLogin, Config.removeMode);

router.get("/content", Auth.requireAdminLogin, Config.getContentConfigList);

router.post("/content", Auth.requireAdminLogin, Config.insertContentConfig);
router.put("/content/:domain", Auth.requireAdminLogin, Config.updateContentConfig);

router.delete("/content/:id", Auth.requireAdminLogin, Config.removeContentConfig);

module.exports = router;
