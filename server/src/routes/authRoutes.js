const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/products", authMiddleware, roleMiddleware("owner", "manager"));



router.get("/me", authMiddleware, authController.getMe);

module.exports = router;