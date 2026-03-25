const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  {
    _id: true, // giữ _id cho từng item giống document mẫu
  }
);

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

cartSchema.index({ userId: 1 }, { unique: true });

module.exports.Carts =
  mongoose.models.Cart || mongoose.model("Cart", cartSchema, "carts");

