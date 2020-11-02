const axios = require('axios')

async function getWonDeals () {
  const result = await axios.get('https://testelinkapi2.pipedrive.com/api/v1/deals/',
    { params: { api_token: process.env.PIPEDRIVE_API_KEY, status: 'won' } }
  )
  return result.data.data
}

async function getDealProducts (dealId) {
  const result = await axios.get(`https://testelinkapi2.pipedrive.com/api/v1/deals/${dealId}/products`,
    { params: { api_token: process.env.PIPEDRIVE_API_KEY } }
  )
  return result.data.data
}

module.exports = {
  getWonDeals,
  getDealProducts
}
