const router = require("express").Router();
const imageController = require("../controllers/imageController");
const upload = require("../middlewares/uploadMoreImages")

router.post("/", upload, imageController.createImage);
router.delete("/:id", imageController.deleteImage);

module.exports = router;