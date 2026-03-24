const express = require('express')
const router = express.Router()
const { getAllProducts, getProductDetail, getProductSoldQuantity, getSimilarProducts } = require('../controllers/product')

router.get('/products', getAllProducts)
router.get('/products/:id', getProductDetail)
router.get('/products/:id/sold-quantity', getProductSoldQuantity)
router.get('/products/:id/similar', getSimilarProducts)

module.exports = router