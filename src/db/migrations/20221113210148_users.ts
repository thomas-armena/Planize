import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema
    .createTable('users', function (table) {
      table.increments('id')
      table.string('firstName', 255)
      table.string('lastName', 255)
      table.string('email', 255)
      table.string('birthDate', 255)
      table.timestamps()
    })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema
    .dropTable('users')
}
