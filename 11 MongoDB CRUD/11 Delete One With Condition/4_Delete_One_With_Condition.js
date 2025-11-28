const connectToDatabase = require('./mongodb');         // here we have to use ./ to point to the javascript file instead of mongodb package

const deleteOne = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // Delete one document from the 'Products' collection
    let result = await collection.deleteOne(
        { "ProductName":"I Phone 7" }
    );
    console.log("Result ::", result);

    if (result?.acknowledged && result?.deletedCount === 1) {
        console.log("Single Record deleted Successfully");
    } else if (result?.acknowledged && result?.deletedCount != 1){
        console.error("Data not found for the delete operation.");
    } else { 
        console.error("Error while deleting the data");
    }
}

// Execute the delete one function
deleteOne();