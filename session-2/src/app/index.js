const pricing = require('pricing')
const database = require('database')
const util = require('util')
const Price = require('models/price')
const Trading = require('trading')

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
    setInterval(mainLoop, time)
    mainLoop()
  }
}
