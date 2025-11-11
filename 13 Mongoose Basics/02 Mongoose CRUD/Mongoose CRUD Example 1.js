const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-Commerce")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("Connection Error:", err));

// Define Schema
const productSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  Category: String,
  Brand: String,
  Price: Number,
});

// Create Model
const Product = mongoose.model("Product", productSchema);

// ===== CREATE =====
function createProduct() {
  Product.create({
    ProductName: "Test Product",
    Category: "Electronics",
    Brand: "TestBrand",
    Price: 1000
  })
  .then((doc) => console.log("Created:", doc))
  .catch((err) => console.error("Create Error:", err));
}

// ===== READ =====
function getAllProducts() {
  Product.find()
    .then((products) => console.log("All Products:", products))
    .catch((err) => console.error("Find Error:", err));
}

function getProductById(productId) {
  Product.findById(productId)
    .then((product) => console.log("Product by ID:", product))
    .catch((err) => console.error("FindById Error:", err));
}

// ===== UPDATE =====
function updateProduct(productId) {
  Product.findByIdAndUpdate(
    productId,
    { Price: 1500 },
    { new: true }
  )
  .then((updated) => console.log("Updated Product:", updated))
  .catch((err) => console.error("Update Error:", err));
}

function updateManyProducts() {
  Product.updateMany(
    { Category: "Electronics" },
    { Brand: "UpdatedBrand" }
  )
  .then((result) => console.log("Updated Many:", result))
  .catch((err) => console.error("UpdateMany Error:", err));
}

// ===== DELETE =====
function deleteProduct(productId) {
  Product.findByIdAndDelete(productId)
    .then((deleted) => console.log("Deleted Product:", deleted))
    .catch((err) => console.error("Delete Error:", err));
}

function deleteManyProducts() {
  Product.deleteMany({ Category: "Test" })
    .then((result) => console.log("Deleted Many:", result))
    .catch((err) => console.error("DeleteMany Error:", err));
}

// ===== COUNT =====
function countProducts() {
  Product.countDocuments({ Brand: "UpdatedBrand" })
    .then((count) => console.log("Count:", count))
    .catch((err) => console.error("Count Error:", err));
}

// ===== AGGREGATION =====
function aggregateExample() {
  Product.aggregate([
    { $match: { Category: "Electronics" } },
    { $group: { _id: "$Brand", totalPrice: { $sum: "$Price" } } }
  ])
  .then((result) => console.log("Aggregation Result:", result))
  .catch((err) => console.error("Aggregation Error:", err));
}

// ===== Example Usage =====
// Uncomment the function calls one by one to test them

// createProduct();
// getAllProducts();
// getProductById("YOUR_PRODUCT_ID");
// updateProduct("YOUR_PRODUCT_ID");
// updateManyProducts();
// deleteProduct("YOUR_PRODUCT_ID");
// deleteManyProducts();
// countProducts();
// aggregateExample();