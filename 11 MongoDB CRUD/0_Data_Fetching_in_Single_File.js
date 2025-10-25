// Import MongoClient from 'mongodb' package
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'E-Commerce';

// Create a new MongoClient instance
const client = new MongoClient(url);

/**
 * Async function to connect to MongoDB and get the 'Products' collection
 * 
 * @returns {Collection} MongoDB Collection object for 'Products'
 */
async function connectToDatabase() {
    try {
        // Connect to the MongoDB server
        let result = await client.connect();
        console.log('Connected successfully to MongoDB');

        // Select the database
        const db = result.db(dbName);

        // Return the 'Products' collection object
        return db.collection('Products');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

/**
 * Main function to fetch data from 'Products' collection
 * Uses async/await for cleaner asynchronous flow
 */
const main = async () => {
    // Get the collection object
    let collection = await connectToDatabase();

    // Fetch all documents from the 'Products' collection
    let data = await collection.find().toArray();

    // Log the fetched data
    console.log('Products Data:', data);

    // Close the connection after operation is complete
    await client.close();
    console.log('MongoDB connection closed');
}

// Execute the main function
main();