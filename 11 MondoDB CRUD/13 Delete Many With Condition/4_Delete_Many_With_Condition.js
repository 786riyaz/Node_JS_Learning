const connectToDatabase = require("../mongodb"); // here we have to use ./ to point to the javascript file instead of mongodb package

const deleteMany = async () => {
  // Get the collection object
  let collection = await connectToDatabase();

  // Delete many documents from the 'Products' collection
  let result = await collection.deleteMany({ Brand: "Apple"  });
  console.log("Result ::", result);

  if (result.acknowledged && result.deletedCount === 1) {
    console.log("Single Record deleted Successfully");
  } else if (result.acknowledged && result.deletedCount >= 1) {
    console.error(`${result.deletedCount} Records deleted Successfully`);
  } else {
    console.error("Error while deleting the data");
  }
};

// Execute the delete Many function
deleteMany();