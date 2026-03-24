const mongoose = require('mongoose')
const { Products } = require('../models/product')
const { OrderItems } = require('../models/orderitem')

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

// get product sold quantity
exports.getProductSoldQuantity = async (req, res) => {
    try {
        const { id } = req.params

        const result = await OrderItems.aggregate([
            {
                $match: {
                    productId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: "$productId",
                    totalSold: { $sum: "$quantity" }
                }
            }
        ]);

        res.status(200).json(result)
    } catch (error) {
        console.error('Error getting product sold quantity:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve product information',
            error: error.message
        });
    }
}

// get similar products
exports.getSimilarProducts = async (req, res) => {
    try {
        const { id } = req.params

        const currentProduct = await Products.findById(id)

        if (!currentProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                error: error.message
            })
        }

        const similarProducts = await Products.find({
            categoryId: currentProduct.categoryId,
            _id: { $ne: id },
            status: 'available'
        })
            .limit(5)
            .sort({ createdAt: -1 })

        res.status(200).json(similarProducts)
    } catch (error) {
        console.error('Error getting similar products:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve products',
            error: error.message
        });
    }
}