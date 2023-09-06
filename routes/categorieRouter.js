const router = require("express").Router();
const categorieController = require("../controllers/categorieController");

router.post("/", categorieController.createCategorie);
router.get("/", categorieController.getAllCategories);
router.get("/:id", categorieController.getCategorieById);
router.delete("/:id", categorieController.deleteCategorie);
router.put("/:id", categorieController.updateCategorie);

module.exports = router;