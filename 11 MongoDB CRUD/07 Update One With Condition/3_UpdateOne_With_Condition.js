const connectToDatabase = require('./mongodb');         // here we have to use ./ to point to the javascript file instead of mongodb package

const updateOne = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // Update one document of the 'Products' collection
    let result = await collection.updateOne(
        { "ProductName": "Acer Predator" },
        { $set: { "Price": 400, "Category":"Laptop" } }
    );
    console.log("Result ::", result);

    if (result?.acknowledged) {
        console.log("Single Record Update Successfully");
    } else {
        console.error("Error while updating the record");
    }
}

// Execute the main function
updateOne();