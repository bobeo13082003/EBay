const mongoose = require('mongoose')
const { Categories } = require('../models/category')

// get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find()

        res.status(200).json(categories)
    } catch (error) {
        console.error('Error getting categories:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve categories',
            error: error.message
        });
    }
}