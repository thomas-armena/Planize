import User from '../../types/user'
import { getUser, getUsers, insertUser, upsertUser } from '../../db/user'
import { GenericResponse } from '../../types/api'
import logger from '../../lib/logging'

const userResolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const users = await getUsers()
      return users ?? []
    },
    user: async (_, { id }): Promise<User | null> => {
      const user = await getUser(id)
      return user ?? null
    },
    loggedInUser: async (_, __, { userId, email }: { userId: string, email: string }): Promise<User | null> => {
      logger.info(`User ${userId} with email ${email} is logged in`)
      const existingUser = await getUser(userId)
      if (existingUser != null) return existingUser
      const newUserId = await insertUser({
        id: userId,
        email
      })
      logger.info(`Created new user with id ${newUserId}`)
      const newUser = await getUser(newUserId)
      logger.info(newUser)
      return newUser
    }
  },
  Mutation: {
    addUser: async (_, { user }: { user: User }): Promise<GenericResponse> => {
      const id = await insertUser(user)
      return {
        success: true,
        message: `User ${id} added`,
        data: { id }
      }
    },
    updateUser: async (_, { user }: { user: User }): Promise<GenericResponse> => {
      const id = await upsertUser(user)
      return {
        success: true,
        message: `User ${id} updated`,
        data: { id }
      }
    }
  }
}

export default userResolvers
