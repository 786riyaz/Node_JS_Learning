const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-Commerce");

// Define a Schema
const productsSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  Category: String,
  Brand: String,
  Price: Number
});

// Create a Model
const Products = mongoose.model("mongoose_test", productsSchema);

// Create a new document
const newProduct = new Products({ ProductName: "Test Item 10", Category: "Test", "Brand" : "Test", Price : 1234, "Test":"Test" });    // Here the "Test":"Test" will be ignore as per the strict mode
// newProduct.save().then(() => console.log("Product saved"));


newProduct.save()
  .then((savedDoc) => console.log("Product saved:", savedDoc))
  .catch((err) => console.error("Error saving product:", err));