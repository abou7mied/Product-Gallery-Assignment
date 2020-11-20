const RequestHandler = require('../RequestHandler')

module.exports = () => {
  return async (error, req, res, next) => {
    return RequestHandler.handle(() => {
      throw error
    }, req, res)
  }
}
