const errors = require('../error-handling/errors.js')

class RequestHandler {
  static async handle(fn, req, res) {
    let response
    let statusCode = 200
    try {
      response = await fn()
    } catch (error) {
      let mappedError = error
      if (error.formatId) {
        mappedError = errors.format(error.formatId)
      }
      if (!mappedError.code) {
        mappedError = errors.factory.internalServerError()
      }
      console.error(`Request ${req.method} ${req.path} failed ${new Date()}, reference: ${mappedError.reference}`, error)
      error = mappedError
      response = {
        errorCode: error.code || null,
        errorReference: error.reference,
      }
      statusCode = error.statusCode || 500
    }
    res.status(statusCode)
    res.json(response)
  }
}

module.exports = RequestHandler
