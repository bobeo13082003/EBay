const mongoose = require("mongoose");
const { Carts } = require("../models/carts");
const { Products } = require("../models/product");

const getOrCreateCart = async (userId) => {
  let cart = await Carts.findOne({ userId });
  if (!cart) {
    cart = await Carts.create({ userId, items: [] });
  }
  return cart;
};

exports.getMyCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await getOrCreateCart(userId);
    return res.status(200).json({ status: 200, data: cart });
  } catch (err) {
    return res.status(500).json({
      message: "Get cart failed",
      error: err.message,
    });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 1) {
      return res.status(400).json({ message: "quantity must be >= 1" });
    }

    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.status !== "available") {
      return res.status(400).json({ message: "Product is unavailable" });
    }

    const cart = await getOrCreateCart(userId);

    const existingItem = cart.items.find((i) =>
      i.productId?.toString() === productId.toString()
    );

    const currentQty = existingItem?.quantity || 0;
    const nextQty = currentQty + qty;

    if (nextQty > product.quantity) {
      return res.status(400).json({
        message: `Only ${product.quantity} item(s) available`,
      });
    }

    if (existingItem) {
      existingItem.quantity = nextQty;
    } else {
      cart.items.push({ productId: new mongoose.Types.ObjectId(productId), quantity: nextQty });
    }

    await cart.save();
    return res.status(200).json({ status: 200, data: cart });
  } catch (err) {
    return res.status(500).json({
      message: "Add item to cart failed",
      error: err.message,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 0) {
      return res.status(400).json({ message: "quantity must be >= 0" });
    }

    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await getOrCreateCart(userId);

    const itemIndex = cart.items.findIndex(
      (i) => i.productId?.toString() === productId.toString()
    );

    if (qty === 0) {
      if (itemIndex !== -1) {
        cart.items.splice(itemIndex, 1);
        await cart.save();
      }
      return res.status(200).json({ status: 200, data: cart });
    }

    if (qty > product.quantity) {
      return res.status(400).json({
        message: `Only ${product.quantity} item(s) available`,
      });
    }

    if (itemIndex === -1) {
      cart.items.push({ productId, quantity: qty });
    } else {
      cart.items[itemIndex].quantity = qty;
    }

    await cart.save();
    return res.status(200).json({ status: 200, data: cart });
  } catch (err) {
    return res.status(500).json({
      message: "Update cart item failed",
      error: err.message,
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await getOrCreateCart(userId);
    cart.items = cart.items.filter(
      (i) => i.productId?.toString() !== productId.toString()
    );

    await cart.save();
    return res.status(200).json({ status: 200, data: cart });
  } catch (err) {
    return res.status(500).json({
      message: "Remove cart item failed",
      error: err.message,
    });
  }
};

