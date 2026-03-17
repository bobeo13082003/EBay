const mongoose = require('mongoose')
const { Products } = require('../models/product')

// get all available products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({ status: "available" }).populate('categoryId', 'name description')

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

        const product = await Products.findById(id)
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
