const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  txnRef: { type: String, unique: true, required: true },
  amount: { type: Number },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  vnpResponseCode: { type: String },
  raw: { type: Object },
  paidAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
