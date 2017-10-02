const config = require('configuration')
const database = require('database')

module.exports = {
  start: async () => {
    await database.connect()
  }
}
