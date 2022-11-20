import db from '../../db/configure'
import logger from '../../lib/logging'
import { GenericResponse } from '../../types/api'

const manageResolvers = {
  Mutation: {
    createUserTable: async (): Promise<GenericResponse> => {
      logger.info('Creating user table')
      await db.schema
        .createTable('users', function (table) {
          table.string('id').primary()
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
    },
    dropUserTable: async (): Promise<GenericResponse> => {
      logger.info('Deleting user table')
      await db.schema.dropTable('users')
      return {
        success: true,
        message: 'User table deleted',
        data: null
      }
    },
    createTodoTable: async (): Promise<GenericResponse> => {
      logger.info('Creating todo table')
      await db.schema
        .createTable('todos', table => {
          table.increments('id').primary()
          table.string('creatorId', 255)
          table.string('title', 255)
          table.string('description', 255)
          table.timestamps()
        })
      return {
        success: true,
        message: 'Todo table created',
        data: null
      }
    },
    dropTodoTable: async (): Promise<GenericResponse> => {
      logger.info('Deleting todo table')
      await db.schema.dropTable('todos')
      return {
        success: true,
        message: 'Todo table deleted',
        data: null
      }
    },
    createTodoProgress: async (): Promise<GenericResponse> => {
      logger.info('Creating todo progress table')
      await db.schema
        .createTable('todoProgress', table => {
          table.increments('id').primary()
          table.integer('todoId', 255)
          table.string('userId', 255)
          table.boolean('completed')
          table.timestamps()
        })
      return {
        success: true,
        message: 'Todo table created',
        data: null
      }
    },
    dropTodoProgress: async (): Promise<GenericResponse> => {
      logger.info('Deleting todo progress table')
      await db.schema.dropTable('todoProgress')
      return {
        success: true,
        message: 'Todo table deleted',
        data: null
      }
    }

  }
}

export default manageResolvers
