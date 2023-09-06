const router = require("express").Router();
const entiteController = require("../controllers/entiteController");
const upload = require("../middlewares/uploadPicture")

router.post("/", upload, entiteController.newEntite);
router.get("/", entiteController.getAllEntites);
// router.get("/:id", categorieController.getCategorieById);
// router.delete("/:id", categorieController.deleteCategorie);
// router.put("/:id", categorieController.updateCategorie);

module.exports = router;