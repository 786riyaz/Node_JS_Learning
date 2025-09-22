const mongoose = require("mongoose");

// Define Schema
const productSchema = new mongoose.Schema({
  ProductName: String,
  Category: String,
  Brand: String,
  Price: Number,
});

module.exports = mongoose.model("products", productSchema);
