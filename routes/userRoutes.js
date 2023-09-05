const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.post("/signIn", userController.login);

module.exports = router;