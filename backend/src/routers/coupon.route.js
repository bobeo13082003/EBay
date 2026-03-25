const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const couponController = require("../controllers/coupon");

router.post("/validate", authMiddleware.authMiddleware, couponController.validateCoupon);

module.exports = router;

