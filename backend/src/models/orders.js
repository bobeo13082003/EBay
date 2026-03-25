const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    orderDate: { type: Date, required: true, default: Date.now },
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, required: true },
    paypalOrderId: { type: String, required: false },
    items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ buyerId: 1, orderDate: -1 });

module.exports.Orders = mongoose.model("Order", orderSchema, "orders");

