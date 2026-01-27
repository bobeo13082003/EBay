const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require('cors');
app.use(cors());


const authRouters = require("./routers/auth")
const addressRouters = require("./routers/address")

app.use("/api/auth", authRouters)
app.use("/api/addresses", addressRouters)

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB()
});