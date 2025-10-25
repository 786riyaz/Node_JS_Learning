const connectToDatabase = require('./mongodb');         // here we have to use ./ to point to the javascript file instead of mongod b package

const main = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // Fetch one document from the 'Products' collection
    let data = await collection.findOne({ProductName:"Lenovo ThinkPad"});

    // Log the fetched data
    console.log('Products Data:', data);
}

// Execute the main function
main();