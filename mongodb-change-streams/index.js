const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const sleep = (time = 0) => new Promise(resolve => setTimeout(resolve, time));

async function connectMongoose() {
  await mongoose.connect('mongodb://localhost/test');

  const messageSchema = new Schema({
    user: String,
    message: String,
  });
  const Message = mongoose.model('Message', messageSchema);

  const changeStream = Message.collection.watch({
    fullDocument: 'updateLookup',
  });
  changeStream.on('change', result => {
    console.log('CHANGES', result.fullDocument);
  });

  await sleep();

  await Message.create({
    user: 'itMe',
    message: `Hello ${Math.random()}`,
  });
  await Message.create({
    user: 'itMe',
    message: `Hello ${Math.random()}`,
  });

  return { Message, mongoose };
}

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

  await sleep();

  // Insert a single document
  let r = await collection.insertOne({ a: 1 });
  assert.equal(1, r.insertedCount);

  // Insert multiple documents
  r = await collection.insertMany([{ a: 2 }, { a: 3 }]);
  assert.equal(2, r.insertedCount);

  return { client, collection };
}

if (require.main === module) {
  connectMongoose();
  process.on('SIGINT', () => {
    if (client) {
      client.close();
    }
  });

  // Keep process open until it's killed with ctrl+c.
  setInterval(() => {}, Number.POSITIVE_INFINITY);
}

// module.exports = connect;
module.exports = connectMongoose;

// require('./index')().then(resp => Object.assign(global, resp));
