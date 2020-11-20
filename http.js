const appFactory = require('./app')
const config = require('./src/config/config');

(async () => {
  const PORT = config.webServer.port
  const app = await appFactory()
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
  })
})()
