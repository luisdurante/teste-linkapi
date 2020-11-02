const mongodb = require('../../config/mongodb')

class AggregatedDealsRepository {
  async getAggregatedDeals () {
    const db = await mongodb.connect()
    return await db.collection('aggregatedDeals').find().toArray()
  }

  async saveAggregatedDeals (date, productsSum) {
    const db = await mongodb.connect()
    await db.collection('aggregatedDeals').update({ date }, { date, productsSum }, { upsert: true })
  }
}

module.exports = new AggregatedDealsRepository()
