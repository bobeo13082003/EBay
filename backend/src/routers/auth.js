const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
router.post("/register", authController.register)
router.post("/verifyOtp", authController.verifyOTP)
router.post("/google", authController.loginWithGoogle)
router.post("/login", authController.login);
module.exports = router;