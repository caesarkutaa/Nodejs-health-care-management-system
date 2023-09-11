// @ts-nocheck

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

// Create a new instance of the in-memory MongoDB server
const mongoServer = new MongoMemoryServer();

// Configure and connect Mongoose to the in-memory database
async function connect() {
    this.mongoServer = await MongoMemoryServer.create();
    const mongoUri = this.mongoServer.getUri();

    this.connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

}

// Disconnect and stop the in-memory database when the tests are done
async function closeDatabase() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

module.exports = { connect, closeDatabase };
