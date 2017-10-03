const config = require('configuration')
const coinbase = require('coinbase')

const apiKey = config.get('COINBASE_API_KEY')
const apiSecret = config.get('COINBASE_API_SECRET')

const client = new coinbase.Client({ apiKey, apiSecret })

/*
 * Also supported 'BTC-EUR' 'BTC-GBP'
 */
var currency = 'BTC-USD'

module.exports = {
  setCurrency: curr => {
    currency = curr
  },
  getPrices: async () => new Promise((resolve, reject) => {
    const currencyPair = currency

    client.getPrice({ currencyPair }, (err, obj) => {
      err ? reject(err) : resolve(obj.data)
    })
  }),
  getSpotPrice: async () => new Promise((resolve, reject) => {
    const currencyPair = currency

    client.getSpotPrice({ currencyPair }, (err, obj) => {
      err ? reject(err) : resolve(obj.data)
    })
  }),
  getBuyPrice: async () => new Promise((resolve, reject) => {
    const currencyPair = currency

    client.getBuyPrice({ currencyPair }, (err, obj) => {
      err ? reject(err) : resolve(obj.data)
    })
  }),
  getSellPrice: async () => new Promise((resolve, reject) => {
    const currencyPair = currency
    client.getSellPrice({ currencyPair }, (err, obj) => {
      err ? reject(err) : resolve(obj.data)
    })
  })
}
