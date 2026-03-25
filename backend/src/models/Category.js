const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true }
})

module.exports.Categories =
  mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categories");