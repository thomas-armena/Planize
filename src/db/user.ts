import db from './configure'
import User from '../types/user'

const UserDBName = 'users'

export const insertUser = async (user: User): Promise<string> => {
  const [id] = await db(UserDBName).insert(user, ['id'])
  return id
}

export const getUsers = async (): Promise<User[]> => {
  const users = await db(UserDBName).select().table(UserDBName)
  return users
}
