import db from '../../db/configure'
import logger from '../../lib/logging'
import { GenericResponse } from '../../types/api'

const manageResolvers = {
  Mutation: {
    createUserTable: async (): Promise<GenericResponse> => {
      logger.info('Creating user table')
      await db.schema
        .createTable('users', function (table) {
          table.increments('id')
          table.string('firstName', 255)
          table.string('lastName', 255)
          table.string('email', 255)
          table.string('birthDate', 255)
          table.timestamps()
        })
      return {
        success: true,
        message: 'User table created',
        data: null
      }
    }
  }
}

export default manageResolvers
