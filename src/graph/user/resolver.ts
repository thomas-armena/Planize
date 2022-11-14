import User from '../../types/user'
import { getUsers, insertUser } from '../../db/user'
import { GenericResponse } from '../../types/api'

const userResolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const users = await getUsers()
      return users
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
    }
  }
}

export default userResolvers
