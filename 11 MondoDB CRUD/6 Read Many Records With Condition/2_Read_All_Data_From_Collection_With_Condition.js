const connectToDatabase = require('./mongodb');         // here we have to use ./ to point to the javascript file instead of mongod b package

const main = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // Fetch many documents from the 'Products' collection
    let data = await collection.find({ Price: { $gt: 500 } }).toArray();
    console.log('Products with price > 500:', data);
}

// Execute the main function
main();