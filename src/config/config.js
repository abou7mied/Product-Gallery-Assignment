require('dotenv-flow').config()

module.exports = {
  webServer: {
    port: process.env.PORT || 3000
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://127.0.0.1/product-gallery'
  },
}
