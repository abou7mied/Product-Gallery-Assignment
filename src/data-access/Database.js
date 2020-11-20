const mongoose = require('mongoose')
const config = require('../config/config')

module.exports = {
  connect() {
    return mongoose.connect(config.mongo.url, {
      useNewUrlParser: true,
    })
  }
}
