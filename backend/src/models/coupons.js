const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    discountPercent: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxUsage: { type: Number, required: true, min: 0 },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: false,
  }
);

couponSchema.index({ code: 1 });

module.exports.Coupons = mongoose.model("Coupon", couponSchema, "coupons");

