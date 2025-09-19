// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');             // Modern JavaScript
const url = 'mongodb://localhost:27017';                // MongoDB connection URL
const dbName = 'E-Commerce';                            // Database name
const client = new MongoClient(url);                    // Create a new MongoClient

async function connectToDatabase() {                    // to make the connection await a function must be async
    try {
        let result = await client.connect();            // Connect to MongoDB server
        console.log('Connected successfully to MongoDB');

        const db = result.db(dbName);                   // Get the database

        const collection = db.collection('Products');
        let response = await collection.find({}).toArray();
        console.log('Documents :', response);
    } catch (err) {
        console.error('MongoDB connection error:', err);
    } finally {
        // Close the connection when done
        await client.close();
    }
}

// Run the function
connectToDatabase();