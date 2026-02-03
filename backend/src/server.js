const express = require('express')
require("dotenv").config();

const cors = require("cors");
const connectDB = require("./dbConnect/db")
const db = require("./models")
const productRoute = require('./routers/product.route')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Restful API server' });
});
app.use('/', productRoute)

const PORT = process.env.PORT || 9999;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Cannot connect to database: ", err);
    process.exit(1);
});