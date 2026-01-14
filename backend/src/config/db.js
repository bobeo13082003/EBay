const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        return true;
    } catch (err) {
        console.error("Lỗi kết nối MongoDB:", err.message);
        throw err;
    }
}

module.exports = connectDb;
