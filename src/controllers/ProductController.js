const UserViewDAL = require('../data-access/UserViewDAL')

class ProductController {

  static async createView(productId, userId) {
    return UserViewDAL.saveUserView(productId, userId)
  }

  static async getProductViews(unique, productId, groupBy, dateFilter) {
    return UserViewDAL.countProductViews(unique, productId, groupBy, dateFilter)
  }
}

module.exports = ProductController
