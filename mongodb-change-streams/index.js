const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function connect() {
  // Connection URL
  const url = 'mongodb://localhost:27017/changeStreamsDemo';
  // Database Name
  const dbName = 'changeStreamsDemo';
  let client, db;

  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(url);

    db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  }

  const collection = db.collection('inserts');

  const changeStream = collection.watch({ fullDocument: 'updateLookup' });

  changeStream.on('change', result => {
    console.log('CHANGES', result.fullDocument);
  });

  await new Promise(resolve => setTimeout(resolve));

  // Insert a single document
  let r = await collection.insertOne({ a: 1 });
  assert.equal(1, r.insertedCount);

  // Insert multiple documents
  r = await collection.insertMany([{ a: 2 }, { a: 3 }]);
  assert.equal(2, r.insertedCount);

  return { client, collection };
}

if (require.main === module) {
  connect();
  process.on('SIGINT', () => {
    if (client) {
      client.close();
    }
  });

  // Keep process open until it's killed with ctrl+c.
  setInterval(() => {}, Number.POSITIVE_INFINITY);
}

module.exports = connect;
