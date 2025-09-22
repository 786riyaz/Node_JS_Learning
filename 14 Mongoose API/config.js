const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-Commerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));
