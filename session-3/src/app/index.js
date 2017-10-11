const pricing = require('pricing')
const database = require('database')
const util = require('util')
const Price = require('models/price')
const Trading = require('trading')
const moment = require('moment')

const setTimeoutPromise = util.promisify(setTimeout)
const time = 10 * 1000

const mainLoop = async () => {
  try {
    const prices = await pricing.getPrices()
    const price = await Price.create(prices)
    console.log('Price obtained')
    await Trading.onPrice(price)
  } catch (error) {
   console.log(error)
  }
}

module.exports = {
  start: async () => {
    await database.connect()
    const start = moment().subtract(3, 'days').subtract(2, 'hours').toDate()
    const end = moment().subtract(3, 'days').toDate()
    const next6 = moment().subtract(3, 'days').add(1, 'hours').toDate()
    const period = 1
    const bollinger = await Trading.getBollinger({ start, period, end })
    const prices = await Price.getRange({ start: end, end: next6 })
    Trading.showAvailable({ bollinger, prices })
    /*
    const availables = prices.filter(price => {
      return price < bollinger['middle']
    })*/
    /*
    setInterval(mainLoop, time)
    mainLoop()
    */
  }
}
