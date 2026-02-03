const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        price: { type: Number, required: true },
        images: [{ type: String, required: true }],
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isAuction: { type: Boolean, default: false },
        auctionEndTime: { type: Date },
        quantity: { type: Number, required: true, default: 0 },
        status: { type: String, default: 'available', enum: ['available', 'unavailable'] },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Product', productSchema, 'products')