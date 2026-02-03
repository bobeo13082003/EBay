const User = require("./User")
const Category = require("./Category")
const Product = require("./Product")

const db = {}

db.User = User
db.Category = Category
db.Product = Product

module.exports = db