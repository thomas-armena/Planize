
import knex from 'knex'
import { DB_NAME, DB_PASS, DB_PORT, DB_USER, INSTANCE_HOST } from '../lib/env'

const db = knex({
  client: 'pg',
  connection: {
    host: INSTANCE_HOST,
    port: parseInt(DB_PORT),
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  }
})

export default db
