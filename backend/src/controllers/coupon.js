const { Coupons } = require("../models/coupons");

const normalizeIds = (items) => {
  if (!Array.isArray(items)) return [];
  return items
    .map((it) => {
      if (!it) return null;
      if (typeof it === "string") return it;
      if (typeof it.productId === "string") return it.productId;
      if (typeof it.product_id === "string") return it.product_id;
      if (it.productId) return it.productId.toString();
      return null;
    })
    .filter(Boolean);
};

exports.validateCoupon = async (req, res) => {
  try {
    const { code, productIds, cartItems } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ message: "code is required" });
    }

    const coupon = await Coupons.findOne({ code: code.trim() });
    if (!coupon) {
      return res.status(400).json({ valid: false, message: "Invalid coupon" });
    }

    const now = new Date();
    if (coupon.startDate && now < coupon.startDate) {
      return res
        .status(400)
        .json({ valid: false, message: "Coupon is not active yet" });
    }
    if (coupon.endDate && now > coupon.endDate) {
      return res.status(400).json({ valid: false, message: "Coupon expired" });
    }
    const usedCount = Number.isFinite(coupon.usedCount)
      ? coupon.usedCount
      : 0;
    if (usedCount >= coupon.maxUsage) {
      return res
        .status(400)
        .json({ valid: false, message: "Coupon usage limit reached" });
    }

    const ids = normalizeIds(productIds || cartItems);
    if (ids.length > 0) {
      const targetId = coupon.productId?.toString();
      if (targetId && !ids.includes(targetId)) {
        return res.status(400).json({
          valid: false,
          message: "Coupon does not apply to items in your cart",
        });
      }
    }

    return res.status(200).json({
      valid: true,
      data: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        productId: coupon.productId,
        maxUsage: coupon.maxUsage,
        usedCount,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Validate coupon failed",
      error: err.message,
    });
  }
};

