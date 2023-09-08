const router = require("express").Router();
const entiteController = require("../controllers/entiteController");
const upload = require("../middlewares/uploadPicture")

router.post("/", upload, entiteController.newEntite);
router.get("/", entiteController.getAllEntites);
router.get("/:id", entiteController.getOneEntityById);
router.delete("/:id", entiteController.deleteEntite);
router.put("/:id", upload, entiteController.editEntity);

module.exports = router;