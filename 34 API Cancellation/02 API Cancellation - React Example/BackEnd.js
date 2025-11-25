const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/amazon");

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    name: String,
    price: Number,
    category: String
  })
);

app.get("/api/search", async (req, res) => {
  console.log("🔍 New search request received");
  const query = req.query.q || "";
  console.log(`🔎 Searching for products matching: "${query}"`);

  // If client disconnects → cancel database operation
  req.on("close", () => {
    console.log("❌ Client closed the connection. Cancelling search…");
  });

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(20);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(5000, () => console.log("API running on port 5000"));
