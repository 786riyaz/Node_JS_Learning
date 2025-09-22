const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-Commerce")
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Define Schema
const productSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  Category: String,
  Brand: String,
  Price: Number,
});

// Create Model
const Product = mongoose.model("mongoose_test", productSchema);

// ---- CREATE Operation ----
function createProduct() {
  const newProduct = new Product({
    ProductName: "Sample Item",
    Category: "Electronics",
    Brand: "ExampleBrand",
    Price: 999,
  });

  newProduct.save()
    .then((doc) => console.log("Product created:", doc))
    .catch((err) => console.error("Error creating product:", err));
}

// ---- READ Operation ----
function getAllProducts() {
  Product.find()
    .then((products) => console.log("All products:", products))
    .catch((err) => console.error("Error fetching products:", err));
}

function getProductById(productId) {
  Product.findById(productId)
    .then((product) => console.log("Product found:", product))
    .catch((err) => console.error("Error finding product:", err));
}

// ---- UPDATE Operation ----
function updateProduct(productId) {
  Product.findByIdAndUpdate(
    productId,
    { Price: 1499 },  // Example update
    { new: true }     // Return updated document
  )
    .then((updatedDoc) => console.log("Product updated:", updatedDoc))
    .catch((err) => console.error("Error updating product:", err));
}

// ---- DELETE Operation ----
function deleteProduct(productId) {
  Product.findByIdAndDelete(productId)
    .then((deletedDoc) => console.log("Product deleted:", deletedDoc))
    .catch((err) => console.error("Error deleting product:", err));
}

// ---- Example usage ----
// First, create a new product
// createProduct();

// Then, get all products
// getAllProducts();

// Get product by ID (replace 'PRODUCT_ID' with actual ID)
// getProductById('68c994d0a1600d00554b6ebb');

// Update product by ID (replace 'PRODUCT_ID' with actual ID)
// updateProduct('68c994d0a1600d00554b6ebb');

// Delete product by ID (replace 'PRODUCT_ID' with actual ID)
deleteProduct('68c994d0a1600d00554b6ebb');