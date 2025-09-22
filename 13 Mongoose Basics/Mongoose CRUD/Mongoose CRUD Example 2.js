const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/E-Commerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));

// Define Schema
const productSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  Category: String,
  Brand: String,
  Price: Number,
});

const insertOneRecord = async () => {
  const Product = mongoose.model("mongoose_tests", productSchema);
  let data = new Product({
    ProductName: "Test 1",
    Category: "Test",
    Brand: "Test",
    Price: 786,
    Extra: "Test", // This Field Name is not in Schema, So This Key-Value pair wont be inserted in Mongo,
  });

  const result = await data.save();
  console.log("Insertion Result :", result);
};
// insertOneRecord();
// =========================================================================

const findOneRecord = async() =>{
  const Product = mongoose.model("mongoose_tests", productSchema);
  let data = await Product.findById("68ccd40f03bbc6889bf73bc7");
  console.log("Data ::",data);
}
// findOneRecord();
// =========================================================================

const updateOneRecord = async () => {
  const Product = mongoose.model("mongoose_tests", productSchema);
  let result = await Product.updateOne(
    { _id: "68ccd45e2a969dad728446a4" },
    {Price: 786786}
  );

  console.log("Result ::", result);
};

// updateOneRecord();
// =========================================================================

const deleteOneRecord = async() => {
  const Product = mongoose.model("mongoose_test", productSchema);
  let result = await Product.deleteOne({_id:"68ccd45e2a969dad728446a4"});
  console.log("Result ::", result);
}
deleteOneRecord();