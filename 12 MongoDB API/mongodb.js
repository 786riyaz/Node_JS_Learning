// This file stores the connection with mongoDB
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'E-Commerce';
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        let result = await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = result.db(dbName);
        return db.collection('Products');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectToDatabase;