const mongoose = require("mongoose");
 
const orderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: false,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports.OrderItems =
  mongoose.models.OrderItem ||
  mongoose.model("OrderItem", orderItemSchema, "orderitems");
