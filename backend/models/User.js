const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { type: String, required: true },
        role: { type: String, default: 'user', enum: ['admin', 'seller', 'user'] },
        avatarUrl: { type: String, trim: true, default: '' },
        isVerified: { type: Boolean, default: 'false' },
        verificationToken: { type: String },
        action: { type: String, default: "lock", enum: ["lock", "unlock"] },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema, 'users')