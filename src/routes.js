const routes = require('express').Router()
const AggregatedDealsController = require('./app/controllers/aggregated-deals.controller')

routes.get('/aggregatedDeals', AggregatedDealsController.getAll)

module.exports = routes
