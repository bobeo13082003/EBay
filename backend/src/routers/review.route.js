const express = require('express')
const router = express.Router()
const { getReviewByProduct } = require('../controllers/reviewController')

router.get('/products/:id/reviews', getReviewByProduct)

module.exports = router