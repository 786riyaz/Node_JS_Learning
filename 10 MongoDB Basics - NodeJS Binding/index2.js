const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'E-Commerce';
const client = new MongoClient(url);

async function connectAndPrintAllData() {
    try {
        await client.connect();
        console.log('✅ Connected successfully to MongoDB');

        const db = client.db(dbName);

        // Get list of all collections
        const collections = await db.listCollections().toArray();
        console.log(`📚 Collections in Database:`, collections.map(c => c.name));

        // Iterate over each collection and print all documents
        for (const collInfo of collections) {
            const collectionName = collInfo.name;
            const collection = db.collection(collectionName);

            const documents = await collection.find({}).toArray();
            console.log(`\n🗂 Documents in Collection "${collectionName}":`);
            console.log(documents);
        }

    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
    } finally {
        await client.close();
        console.log('\n🔒 Connection closed');
    }
}

// Run the function
connectAndPrintAllData();
