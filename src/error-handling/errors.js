const uuid = require('uuid')

const errorsSpecs = {
  NOT_FOUND: {
    name: 'NOT_FOUND',
    message: 'not found',
    code: 404,
    statusCode: 404,
    hideFromLogs: true
  },
  INVALID_DATA: {
    name: 'INVALID_DATA',
    message: 'invalid data',
    code: -1,
    statusCode: 400
  },
  INTERNAL_SERVER_ERROR: {
    name: 'INTERNAL_SERVER_ERROR',
    message: 'internal server error occurred',
    code: -3,
    statusCode: 500
  },
}

function initError(errorInfo = {}) {
  const error = new Error(errorInfo.message)
  error.reference = uuid.v4()
  error.name = errorInfo.name
  error.code = errorInfo.code
  error.statusCode = errorInfo.statusCode
  return error
}

const errorsFactory = {
  notFound(options) {
    return initError(errorsSpecs.NOT_FOUND, options)
  },
  invalidData(options) {
    return initError(errorsSpecs.INVALID_DATA, options)
  },
  internalServerError(options) {
    return initError(errorsSpecs.INTERNAL_SERVER_ERROR, options)
  }
}


module.exports = {
  factory: errorsFactory,
  format: (formatId) => initError(errorsSpecs[formatId])
}
