const config = require('config.json')

exports.get = key => process.env[key] || config[key]
