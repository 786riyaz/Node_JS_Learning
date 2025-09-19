const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'E-Commerce';
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        // Connect to MongoDB server
        await client.connect();
        console.log('Connected successfully to MongoDB');

        // Get the database
        const db = client.db(dbName);

        // Example: List collections
        const collections = await db.collections();
        console.log('Collections in DB:', collections.map(col => col.collectionName));

        // You can perform further DB operations here...

    } catch (err) {
        console.error('MongoDB connection error:', err);
    } finally {
        // Close the connection when done
        await client.close();
    }
}

// Run the function
connectToDatabase();