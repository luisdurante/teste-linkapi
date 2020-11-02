const pipedrive = require('./pipedrive')
const bling = require('./bling')
const saveDealsByDateAndTotalValue = require('../app/services/aggregated-deals.service').saveAggregatedDeals
const moment = require('moment')
const jsonToXml = require('js2xmlparser').parse

async function startIntegration () {
  const wonDeals = await pipedrive.getWonDeals()
  const wonDealsWithProducts = wonDeals.filter(deal => deal.products_count)
  let aggregatedDealsByDateAndValue = {}

  for (const deal of wonDealsWithProducts) {
    const products = await pipedrive.getDealProducts(deal.id)
    const xmlOrder = normalizePipedriveDataToBling(deal, products)
    await bling.saveOrder(xmlOrder)

    aggregatedDealsByDateAndValue = aggregateDeal(aggregatedDealsByDateAndValue, deal)
  }
  await saveDealsByDateAndTotalValue(aggregatedDealsByDateAndValue)
}

function normalizePipedriveDataToBling (deal, products) {
  const order = {
    numero: deal.id,
    data: moment(deal.add_time).format('DD/MM/YYYY'),
    cliente: fillClientInformation(deal),
    itens: { item: fillItemsInformation(products) }
  }

  return jsonToXml('pedido', order)
}

function fillClientInformation (deal) {
  const client = deal.person_id || deal.org_id
  const clientInfo = {
    nome: client.name,
    endereco: client.address || ''
  }

  if (deal.person_id) {
    clientInfo.id = client.value
    clientInfo.email = client.email.length ? client.email[0].value : ''
    clientInfo.fone = client.phone.length ? client.phone[0].value : ''
  }

  return clientInfo
}

function fillItemsInformation (products) {
  return products.map(product => {
    return {
      codigo: product.product_id,
      vlr_unit: product.item_price,
      qtde: product.quantity
    }
  })
}

function aggregateDeal (aggregatedDeals, deal) {
  const dealDate = moment(deal.add_time).format('YYYY-MM-DD')
  if (!aggregatedDeals[dealDate]) {
    aggregatedDeals[dealDate] = { productsValuesSum: 0 }
  }
  aggregatedDeals[dealDate].productsValuesSum += deal.value
  return aggregatedDeals
}

module.exports = {
  startIntegration
}
