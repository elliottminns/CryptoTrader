const Price = require('models/price')
const moment = require('moment')

exports.onPrice = async function(price) {
  const start = moment().subtract(1, 'days').toDate()

  const dayAverage = await Price.getMean({ start })
  const dayMax = await Price.getMax({ start })
  const dayMin = await Price.getMin({ start })
  const dayMedian = await Price.getMedian({ start })

  console.log('')
  console.log(`mean: ${dayAverage}`)
  console.log(`max: ${dayMax}`)
  console.log(`min: ${dayMin}`)
  console.log(`median: ${dayMedian}`)

  console.log(`current: ${price.spot}`)
}
