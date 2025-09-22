const { ObjectId } = require("mongodb");
const express = require("express");
require("./config");
const Product = require("./product");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(express.json());

app.post("/create", async (req, res) => {
  console.log("Inside the Post Method");
  // console.log("Request Data ::", req);
  let requestBody = req.body;
  // res.send(requestBody);
  console.log("Request Data ::", requestBody);
  let data = new Product(requestBody);
  console.log("Data to be inserted ::", data);
  const result = await data.save();
  console.log("Result ::", result);
  res.send(result);
});

app.get("/read", async (req, res) => {
  console.log("Inside the Get Method");
  let data = await Product.find();
  console.log("Database Data ::", data);
  res.send(data);
});

app.put("/update", async (req, res) => {
  console.log("Inside the Put Method");
  console.log("Request Body :::", req.body);

  let result = await Product.updateOne(
    { _id: req.body.ID },
    { $set: req.body }
  );
  console.log("Result ::", result);
  res.send(result);
});

app.put("/updateByID/:_id", async (req, res) => {
  console.log("Inside Update By ID Method");
  console.log("Request Body :::", req.body);
  console.log("Request Params :::", req.params);
  // res.send(req.body);
  let result = await Product.updateOne(
    // { _id: new ObjectId(req.params._id) },
    req.params,
    { $set: req.body }
  );
  console.log("Result ::", result);
  res.send(result);
});

app.delete("/delete", async (req, res) => {
  console.log("Inside Delete Method");
  console.log("Request Body :::", req.body.ID);
  const result = await Product.deleteOne({ _id: req.body.ID });

  console.log("Result :::", result);
  res.send(result);
});

app.delete("/deleteByID/:_id", async (req, res) => {
  console.log("Inside Delete By ID Method");
  console.log("Request Body :::", req.body);
  console.log("Request Params :::", req.params);
  // res.send(req.body);

  // let result = await Product.deleteOne(req.params);
  let result = await Product.deleteOne({ _id: new ObjectId(req.params._id) });
  console.log("Result ::", result);
  res.send(result);
});

app.get("/getByOr/:key", async (req, res) => {
  console.log("Inside Get By OR Method");
  // console.log("Parameter ::", req.params);
  console.log("Parameter ::", req.params.key);
  const searchKey = req.params.key;
  let result = await Product.find({
    $or: [
      /*    This Condition Fetches all the data which satisfies any of the following condition (Matches Exact Same String) with the same UpperCase and LowerCase in Input
      { ProductName: req.params.key },
      { Category: req.params.key },
      { Brand: req.params.key },
       */

      /*    This Condition Fetches all the data which satisfies any of the following condition (Matches likely Matched String) with the same UpperCase and LowerCase in Input
      // {$regex: searchKey }
      { ProductName: { $regex: searchKey } },
      { Category: { $regex: searchKey } },
      { Brand: { $regex: searchKey } },
      */

      /*    This Condition Fetches all the data which satisfies any of the following condition (Matches likely Matched String) ignoring the UpperCase or LowerCase
      // {$regex: searchKey, $options: "i"} → "i" makes the search case-insensitive.
      */
      { ProductName: { $regex: searchKey, $options: "i" } },
      { Category: { $regex: searchKey, $options: "i" } },
      { Brand: { $regex: searchKey, $options: "i" } },
    ],
  });
  console.log("Result ::", result);
  res.send(result);
});

app.listen(786);