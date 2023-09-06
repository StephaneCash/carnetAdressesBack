const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.post("/signIn", userController.login);
router.put("/:id", userController.updateUser);

module.exports = router;