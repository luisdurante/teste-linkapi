const saveAggregatedDeals = require('../repositories/aggregated-deals.repository').saveAggregatedDeals

class AggregatedDealsService {
  async saveAggregatedDeals (aggregatedDealsByDateAndValue) {
    for (const date in aggregatedDealsByDateAndValue) {
      await saveAggregatedDeals(date, aggregatedDealsByDateAndValue[date].productsValuesSum)
    }
  }
}

module.exports = new AggregatedDealsService()
