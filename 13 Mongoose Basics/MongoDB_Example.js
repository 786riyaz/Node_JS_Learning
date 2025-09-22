const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

async function run() {
  const client = new MongoClient(url);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('users');

  await collection.insertOne({ name: 'Riyaz', age: 25 });
  console.log('User inserted');

  await client.close();
}

run();