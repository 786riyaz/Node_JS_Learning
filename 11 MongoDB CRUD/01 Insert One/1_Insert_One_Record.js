const connectToDatabase = require('./mongodb');         // here we have to use ./ to point to the javascript file instead of mongod b package

const insertOne = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // insert one document to the 'Products' collection
    let result = await collection.insertOne({ "ProductName":"Macbook Air 5", "Category":"Laptop", "Brand":"Apple", "Price":3000 })
    
    if(result.acknowledged){
        console.log("Data inserted Succesfully");
    } else {
        console.error("Error While inserting Data");
    }
}

// Execute the insertOne function
insertOne();