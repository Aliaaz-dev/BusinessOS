const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema } = require("../validators/authValidator");

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);

module.exports = router;