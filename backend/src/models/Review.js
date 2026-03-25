const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = mongoose.Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

module.exports.Reviews =
  mongoose.models.Review || mongoose.model("Review", reviewSchema, "reviews");