
import knex from 'knex'
import config from '../lib/config'

const db = knex({
  client: 'pg',
  connection: {
    host: config.instanceHost,
    port: parseInt(config.dbPort ?? '5432'),
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName
  }
})

export default db
