const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

// =======================
// PUBLIC ROUTES
// =======================

router.post("/login", userController.loginUser);
router.post("/", userController.createUser);

// =======================
// PROTECTED ROUTES
// =======================

router.use(verifyToken);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;