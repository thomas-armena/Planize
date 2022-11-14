
import knex from 'knex'
import config from '../lib/config'

const dbConfig = {
  client: 'pg',
  connection: {
    host: config.instanceHost,
    port: parseInt(config.dbPort ?? '5432'),
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName
  }
}

const db = knex(dbConfig)

export default db
