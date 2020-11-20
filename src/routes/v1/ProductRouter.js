const {Router} = require('express')
const ProductController = require('../../controllers/ProductController')
const RequestHandler = require('../RequestHandler')

const router = new Router()

function getProductViews(unique, req, res) {
  const {productId} = req.params
  const {start_date: startDate, end_date: endDate, group_by: groupBy} = req.query
  return RequestHandler.handle(() => ProductController.getProductViews(unique, productId, groupBy, {
    startDate,
    endDate
  }), req, res)
}

router.get('/:productId/views', (req, res) => {
  return getProductViews(false, req, res)
})

router.get('/:productId/unique-views', async (req, res) => {
  return getProductViews(true, req, res)
})

router.post('/:productId/view', async (req, res) => {
  return RequestHandler.handle(async () => {
    const {product_id: productId, user_id: userId} = req.body
    try {
      return await ProductController.createView(productId, userId)
    } catch (error) {
      if (error.message.match(/must be a single String/i)) {
        error.formatId = 'INVALID_DATA'
      }
      throw error
    }
  }, req, res)
})

module.exports = router
