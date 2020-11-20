const {Router} = require('express')
const routerV1 = require('./v1')

const router = new Router()

router.get('/', (req, res) => {
  res.json({
      message: 'ok'
    }
  )
})

router.use('/api/v1', routerV1)

module.exports = router
