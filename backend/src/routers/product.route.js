const express = require('express')
const router = express.Router()
const { getAllProducts, getProductDetail } = require('../controllers/product')

router.get('/products', getAllProducts)
router.get('/products/:id', getProductDetail)

module.exports = router