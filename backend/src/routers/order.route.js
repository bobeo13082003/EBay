const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const orderController = require("../controllers/order");

router.post("/", authMiddleware.authMiddleware, orderController.createOrder);

module.exports = router;

