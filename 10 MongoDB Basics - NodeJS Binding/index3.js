const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
// const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url);
const dbName = 'amazon';

async function main() {
  let result = await client.connect();
  console.log('Connected successfully to server');
  const db = result.db(dbName);
  console.log('Database:', db.databaseName);

  const collection = db.collection('products');
  const findResult = await collection.find().toArray();
  console.log('Found documents =>', findResult);
}

// module.exports = main;
main().catch(console.error);