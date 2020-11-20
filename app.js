const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes')
const Database = require('./src/data-access/Database')
const errorMiddleware = require('./src/routes/middlewares/error')
const errors = require('./src/error-handling/errors')

async function appFactory() {
  const app = express()
  await Database.connect()
  console.log('Database connected')
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(router)
  app.use('*', (req, res, next) => next(errors.factory.notFound()))
  app.use(errorMiddleware())
  return app;
}

module.exports = appFactory
