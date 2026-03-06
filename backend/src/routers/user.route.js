const express = require('express')
const router = express.Router()
const { getUserDetail } = require('../controllers/userController')

router.get('/user/:id', getUserDetail)

module.exports = router