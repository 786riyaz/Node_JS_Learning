const connectToDatabase = require('../mongodb');         // here we have to use ./ to point to the javascript file instead of mongodb package

const updateMany = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // Update many documents of the 'Products' collection
    let result = await collection.updateMany(
        { "Test":786 },
        { $set: { "Test": 786786 } }
    );
    console.log("Result ::", result);

    if (result.acknowledged) {
        console.log("Multiple Records Update Successfully");
    } else {
        console.error("Error while updating the records");
    }
}

// Execute the Update One function
updateMany();