const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://studentassignments:admin@clusterstudent.2cssltu.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=ClusterStudent";

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function connect() {
  await client.connect();
}


module.exports = client;