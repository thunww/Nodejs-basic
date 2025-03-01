const express = require("express");
const { handleRegister, handleLogin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

module.exports = router;
