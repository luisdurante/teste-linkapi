const MongoClient = require('mongodb').MongoClient

let mongodb
let client

async function connect () {
  if (mongodb) {
    return mongodb
  }

  client = await MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true })
  mongodb = client.db(process.env.NAME)

  return mongodb
};

module.exports = {
  connect
}
