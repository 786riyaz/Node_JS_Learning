const express = require("express"); // Express is required to create APIs
const dbConnect = require("./mongodb");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  console.log("Inside Post Method at root");
  // res.send({name:"Riyaz"});                                        // Sample Response
  // console.log("Whole Request ::: ", req);
  console.log("Request Body ::: ", req.body);
  // res.send(req.body);                                              // Request Body
  let data = await dbConnect();
  let result = await data.insertOne(req.body);
  // res.send(result); // Insertion Result
  console.log("Result ::", result);
  console.log("Inserted ID ::", result.insertedId);

  if (result.acknowledged) {
    console.log("Record Inserted Successfully");
    res.send("Record Inserted at ID : " + result.insertedId); // Successful Message
  } else {
    console.log("Failed to Insert the Record");
    res.send("Failed to Insert the Record"); // Failed Message
  }
});

app.get("/", async (req, res) => {
  console.log("Inside Get Method at Root");
  // res.send({name:"Riyaz"});                      // Sample Response
  let data = await dbConnect();
  data = await data.find().toArray(); // Fetching all the data from Collection
  console.log("Data Fetched From MongoDB ===> ", data);
  console.log("================================================");
  res.send(data);
  console.log("Sent data to API Respnse.");
});

app.put("/", async (req, res) => {
  console.log("Inside Put Method at Root");
  // res.send({name:"Riyaz"});                                        // Sample Response
  // console.log("Whole Request ::: ", req);
  console.log("Request Body ::: ", req.body);
  // res.send(req.body);                                              // Request Body
  let data = await dbConnect();
  let result = await data.updateOne(
    { ProductName: req.body.ProductName },
    { $set: req.body } // This way we can also add new key-value in the document but wont be able to remove any key-value pair using PUT method
  );
  console.log("Result ::", result);
  // res.send(result);

  if (result.acknowledged) {
    console.log("Record Updated Successfully");
    res.send("Record Updated Successfully"); // Successful Message
  } else {
    console.log("Failed to Update the Record");
    res.send("Failed to Update the Record"); // Failed Message
  }
});

app.delete("/:id", async (req, res) => {
  // Fetching ID for the deletion operation
  console.log("Indide Delete Method at Root");
  console.log("Document ID Received ::", req.params.id);

  let data = await dbConnect();
  let result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id), // Convert string to ObjectId
  });
  console.log("Result ::", result);
  // res.send(result); // Sample Response

  if (result.acknowledged && result.deletedCount >= 1) {
    console.log("Record Deleted Successfully");
    res.send("Record Deleted Successfully"); // Successful Message
  } else {
    console.log("Failed to Delete the Record");
    res.send("Failed to Delete the Record"); // Failed Message
  }
});

app.listen(786);
