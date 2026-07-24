const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const { verifyToken } = require("../middleware/auth");

// CRUD Routes
router.use(verifyToken);
router.get("/", bookController.getAllBooks);
router.get("/statistics", bookController.getStatistics);
router.get("/:id", bookController.getBookById);

router.post("/", bookController.createBook);

router.put("/:id", bookController.updateBook);

router.patch("/:id", bookController.patchBook);

router.delete("/:id", bookController.deleteBook);

module.exports = router;