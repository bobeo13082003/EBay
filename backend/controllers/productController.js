const mongoose = require('mongoose')
const Product = require('../models/Product')

// get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId', 'name description')

        res.status(200).json(products)
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve products',
            error: error.message
        });
    }
}
