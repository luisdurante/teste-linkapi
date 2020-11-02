const getAggregatedDeals = require('../repositories/aggregated-deals.repository').getAggregatedDeals

class AggregatedDealsController {
  async getAll (req, res) {
    const aggregatedDeals = await getAggregatedDeals()
    return res.json({ data: aggregatedDeals })
  }
}

module.exports = new AggregatedDealsController()
