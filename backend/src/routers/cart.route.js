const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const cartController = require("../controllers/cart");

router.get("/me", authMiddleware.authMiddleware, cartController.getMyCart);
router.post("/items", authMiddleware.authMiddleware, cartController.addItemToCart);
router.patch(
  "/items/:productId",
  authMiddleware.authMiddleware,
  cartController.updateCartItem
);
router.delete(
  "/items/:productId",
  authMiddleware.authMiddleware,
  cartController.removeCartItem
);

module.exports = router;

