const mongoose = require('mongoose')
const { Users } = require("../models/users")

// get user details
exports.getUserDetail = async (req, res) => {
    try {
        const userId = req.user.userId; // lấy từ token

        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const formatted = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            avatarURL: user.avatarURL,
            createdAt: user.createdAt
        };

        return res.status(200).json({
            success: true,
            data: formatted
        });

    } catch (error) {
        console.error('Error getting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve user',
            error: error.message
        });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { username, email, avatarURL } = req.body;

        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // update fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (avatarURL) user.avatarURL = avatarURL;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};