const express = require('express')
const router = express.Router()
const { getUserDetail, updateUserProfile } = require('../controllers/user')
const authMiddleware = require("../middlewares/auth");

router.get('/', authMiddleware.authMiddleware, getUserDetail);
router.put('/', authMiddleware.authMiddleware, updateUserProfile);

module.exports = router