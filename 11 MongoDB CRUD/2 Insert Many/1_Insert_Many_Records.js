const connectToDatabase = require('./mongodb');         // here we have to use ./ to point to the javascript file instead of mongod b package

const insertMany = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // insert many documents to the 'Products' collection
    let result = await collection.insertMany([
        { "ProductName":"I Phone 6", "Category":"Mobile", "Brand":"Apple", "Price":2000 },
        { "ProductName":"I Phone 7", "Category":"Mobile", "Brand":"Apple", "Price":3000 },
        { "ProductName":"I Phone 11", "Category":"Mobile", "Brand":"Apple", "Price":5000 }
    ])
    
    if(result.acknowledged){
        console.log("Records inserted Succesfully");
    } else {
        console.error("Error While inserting Records");
    }
}

// Execute the insert many function
insertMany();