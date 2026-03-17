const mongoose = require('mongoose')
const { Reviews } = require('../models/review')

// get all review of an product
exports.getReviewByProduct = async (req, res) => {
    try {
        const { id } = req.params

        const reviews = await Reviews.find({ productId: id })
            .populate('reviewerId', 'username email avatarURL')

        res.status(200).json(reviews)
    } catch (error) {
        console.error('Error getting product reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve reviews',
            error: error.message
        });
    }
}