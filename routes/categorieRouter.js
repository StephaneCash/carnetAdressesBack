const router = require("express").Router();
const categorieController = require("../controllers/categorieController");
const upload = require("../middlewares/uploadPicture")

router.post("/",upload, categorieController.createCategorie);
router.get("/", categorieController.getAllCategories);
router.get("/:id", categorieController.getCategorieById);
router.delete("/:id", categorieController.deleteCategorie);
router.put("/:id",upload, categorieController.updateCategorie);

module.exports = router;