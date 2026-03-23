const express = require('express')
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
const connectDB = require("./config/db");

const authRouters = require("./routers/auth")
const addressRouters = require("./routers/address")
const productRoute = require('./routers/product.route')
const categoryRoute = require('./routers/category.route')
const reviewRoute = require('./routers/review.route')
const userRoute = require('./routers/user.route')

app.use(cors())

app.use("/api/auth", authRouters)
app.use("/api/addresses", addressRouters)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Restful API server' });
});
app.use('/', productRoute)
app.use('/categories', categoryRoute)
app.use('/', reviewRoute)
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 9999;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Cannot connect to database: ", err);
    process.exit(1);
});