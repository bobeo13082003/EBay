const { Carts } = require("../models/carts");
const { Products } = require("../models/product");
const { Orders } = require("../models/orders");
const { OrderItems } = require("../models/orderitem");
const { Coupons } = require("../models/coupons");

exports.createOrder = async (req, res) => {
  try {
    const buyerId = req.user.userId;
    const { addressId, couponCode, paypalOrderId, items } = req.body;

    if (!addressId) {
      return res.status(400).json({ message: "addressId is required" });
    }

    const cart = await Carts.findOne({ userId: buyerId });
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItemsInput =
      Array.isArray(items) && items.length > 0 ? items : cart.items;

    if (!Array.isArray(orderItemsInput) || orderItemsInput.length === 0) {
      return res.status(400).json({ message: "No items to order" });
    }

    // 1) Validate products + build subtotal
    let subtotalPrice = 0;
    const normalizedItems = orderItemsInput.map((it) => ({
      productId: (it.productId || it.product_id).toString(),
      quantity: Number(it.quantity),
    }));

    for (const it of normalizedItems) {
      if (!it.productId) {
        return res.status(400).json({ message: "Invalid productId in items" });
      }
      if (!Number.isFinite(it.quantity) || it.quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity in items" });
      }

      const product = await Products.findById(it.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${it.productId}` });
      }
      if (product.status !== "available") {
        return res.status(400).json({ message: `Product is unavailable: ${product.title}` });
      }
      if (it.quantity > product.quantity) {
        return res.status(400).json({ message: `Only ${product.quantity} item(s) available for ${product.title}` });
      }

      subtotalPrice += product.price * it.quantity;
    }

    // 2) Coupon
    let discountAmount = 0;
    let normalizedCouponCode = couponCode?.toString().trim();

    if (normalizedCouponCode) {
      const coupon = await Coupons.findOne({ code: normalizedCouponCode });
      if (!coupon) {
        return res.status(400).json({ message: "Invalid coupon" });
      }

      const now = new Date();
      if (coupon.startDate && now < coupon.startDate) {
        return res.status(400).json({ message: "Coupon is not active yet" });
      }
      if (coupon.endDate && now > coupon.endDate) {
        return res.status(400).json({ message: "Coupon expired" });
      }
      const usedCount = Number.isFinite(coupon.usedCount)
        ? coupon.usedCount
        : 0;
      if (usedCount >= coupon.maxUsage) {
        return res.status(400).json({ message: "Coupon usage limit reached" });
      }

      const targetId = coupon.productId?.toString();
      const productIdsInCart = normalizedItems.map((x) => x.productId);
      if (targetId && !productIdsInCart.includes(targetId)) {
        return res.status(400).json({
          message: "Coupon does not apply to items in your cart",
        });
      }

      discountAmount =
        (subtotalPrice * coupon.discountPercent) / 100;

      // 3) Create order (first), then update coupon usage and reduce stock
      // We'll increase usedCount only if order is successfully created.
      const order = await Orders.create({
        buyerId,
        addressId,
        status: "created",
        paypalOrderId: paypalOrderId || undefined,
        items: [],
        subtotalPrice,
        discountAmount,
        couponCode: coupon.code,
        totalPrice: Math.max(0, subtotalPrice - discountAmount),
      });

      const createdOrderItems = [];
      for (const it of normalizedItems) {
        const oi = await OrderItems.create({
          orderId: order._id,
          product_id: it.productId,
          quantity: it.quantity,
        });
        createdOrderItems.push(oi);
      }

      order.items = createdOrderItems.map((x) => x._id);
      await order.save();

      // Reduce stock
      for (const it of normalizedItems) {
        await Products.findByIdAndUpdate(it.productId, {
          $inc: { quantity: -it.quantity },
        });
      }

      // Increase coupon usage (handle legacy coupons missing usedCount field)
      coupon.usedCount = usedCount + 1;
      await coupon.save();

      // Clear cart
      cart.items = [];
      await cart.save();

      return res.status(201).json({ status: 201, data: order });
    }

    // Create order without coupon
    const order = await Orders.create({
      buyerId,
      addressId,
      status: "created",
      paypalOrderId: paypalOrderId || undefined,
      items: [],
      subtotalPrice,
      discountAmount: 0,
      totalPrice: subtotalPrice,
    });

    const createdOrderItems = [];
    for (const it of normalizedItems) {
      const oi = await OrderItems.create({
        orderId: order._id,
        product_id: it.productId,
        quantity: it.quantity,
      });
      createdOrderItems.push(oi);
    }

    order.items = createdOrderItems.map((x) => x._id);
    await order.save();

    // Reduce stock
    for (const it of normalizedItems) {
      await Products.findByIdAndUpdate(it.productId, {
        $inc: { quantity: -it.quantity },
      });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    return res.status(201).json({ status: 201, data: order });
  } catch (err) {
    return res.status(500).json({
      message: "Create order failed",
      error: err.message,
    });
  }
};

