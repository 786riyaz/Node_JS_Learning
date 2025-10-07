const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const chatSchema = new mongoose.Schema({
  userName: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const chatModel = mongoose.model("Chat", chatSchema);

app.get("/", (req, res) => {
  console.log("Inside / route");
  res.send("Hello World!");
});

app.get("/getAllMessage", async (req, res) => {
  console.log("Inside /getAllMessage route");
  //   let data = await chatModel.find();
  let data = await chatModel.find().select("-_id -__v");
  //   console.log("Database Data ::", data);
  console.log("Sent Data Length ::", data.length);
  res.send(data);
});

app.post("/addMessage", async (req, res) => {
  console.log("Inside /addMessage route");
  let requestBody = req.body;
  //   console.log("Request Data ::", requestBody);
  let data = new chatModel(requestBody);
  //   console.log("Data to be inserted ::", data);
  const result = await data.save();
  console.log("Result ::", result?._id);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});