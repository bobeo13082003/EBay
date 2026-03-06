const mongoose = require('mongoose')
const User = require('../models/User')

// get user details
exports.getUserDetail = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: error.message
            })
        }

        const formatted = {
            _id: user._id,
            username: user.username,
            email: user.email,
            action: user.action,
            role: user.role,
            isVerified: user.isVerified,
            avatarURL: user.avatarURL,
            createdAt: user.createdAt
        }

        res.status(200).json(formatted)
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve products',
            error: error.message
        });
    }
}