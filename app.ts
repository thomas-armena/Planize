import express from 'express'
import apolloServer from './src/graph/server'
import logger from './src/lib/logging'
import dotenv from 'dotenv'
const app = express()
const port = 9000
dotenv.config() // Load .env file

const startServer = async (): Promise<void> => {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    return logger.info(`Express is listening at http://localhost:${port}`)
  })
}

startServer()
  .then(() => {
    logger.info('Planize API Server successfully started')
  })
  .catch((e) => {
    logger.error('Planize API Server failed to start', e)
  })
