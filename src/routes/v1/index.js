const {Router} = require('express')
const productRouter = require('./ProductRouter')

const router = new Router()

router.use('/product', productRouter)

module.exports = router
