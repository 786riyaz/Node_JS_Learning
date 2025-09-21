const express = require("express");
const app = express();
const dbConnect = require("./mongodb");
app.use(express.json());

// Create: Add a new item
app.post("/", async (req, res) => {
  try {
    const db = await dbConnect();
    console.log("Request Body ::", req.body);
    const result = await db.insertOne(req.body);
    // console.log("Whole Response ::: ", res);
    console.log("Status Code Before sending the response ::: ", res.statusCode);
    // res.status(201).send(result.ops[0] || result);        // Return inserted document, Now Deprecated
    res.status(201).send({ _id: result.insertedId, ...req.body });
    console.log("Status Code After sending the response ::: ", res.statusCode);
  } catch (error) {
    res.status(500).send({ error: "Failed to create item :: " + error });
  }
});

// Read: Get all items
app.get("/", async (req, res) => {
  try {
    const db = await dbConnect();
    const data = await db.find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

// Read: Get one item by ID
app.get("/:id", async (req, res) => {
  try {
    const db = await dbConnect();
    const ObjectId = require("mongodb").ObjectId;
    const item = await db.findOne({ _id: new ObjectId(req.params.id) });
    if (!item) return res.status(404).send({ error: "Item not found" });
    res.send(item);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch item" });
  }
});

// Update: Update item by ID
app.put("/:id", async (req, res) => {
  try {
    const db = await dbConnect();
    const ObjectId = require("mongodb").ObjectId;
    const result = await db.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0)
      return res.status(404).send({ error: "Item not found" });
    res.send({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).send({ error: "Failed to update item" });
  }
});

// Delete: Delete item by ID
app.delete("/:id", async (req, res) => {
  try {
    const db = await dbConnect();
    const ObjectId = require("mongodb").ObjectId;
    const result = await db.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).send({ error: "Item not found" });
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete item" });
  }
});

app.listen(786, () => console.log("Server running on port 786"));
