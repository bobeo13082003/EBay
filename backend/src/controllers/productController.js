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

// get product detail by id
exports.getProductDetail = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)
            .populate('categoryId', 'name description')
            .populate('sellerId', '_id username avatarURL')

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                error: error.message
            })
        }

        res.status(200).json(product)
    } catch (error) {
        console.error('Error getting product detail:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve product detail',
            error: error.message
        });
    }
}
