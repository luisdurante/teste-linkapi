const axios = require('axios')

async function saveOrder (xmlOrder) {
  await axios.post('https://bling.com.br/Api/v2/pedido/json/',
    {}, { params: { apikey: process.env.BLING_API_KEY, xml: xmlOrder } })
}

module.exports = {
  saveOrder
}
