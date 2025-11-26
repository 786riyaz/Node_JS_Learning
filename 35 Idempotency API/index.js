// server.js
const express = require("express");
const mongoose = require("mongoose");
const Idempotency = require("./models/Idempotency");
const idempotency = require("./middleware/idempotency");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Example POST API (create order)
app.post("/order", idempotency, async (req, res) => {
  console.log("Creating order...");
  // simulate order creation
  const order = {
    id: Date.now(),
    product: req.body.product,
    amount: req.body.amount
  };

  // Save response for future retries
  await Idempotency.create({
    key: req.idempotencyKey,
    response: order
  });

  res.json(order);
});

mongoose.connect("mongodb://localhost:27017/test").then(() => {
  console.log("Mongo connected");
  app.listen(3000);
});
