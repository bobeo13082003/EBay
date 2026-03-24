const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const authMiddleware = require("../middlewares/auth");

router.post("/register", authController.register)
router.post("/verifyOtp", authController.verifyOTP)
router.post("/google", authController.loginWithGoogle)
router.post("/login", authController.login);
router.get("/me", authMiddleware.authMiddleware, authController.getMyProfile);
module.exports = router;