import db from './configure'
import User from '../types/user'

const UserDBName = 'users'

export const insertUser = async (user: User): Promise<string> => {
  const [row] = await db(UserDBName).insert(user, ['id'])
  return row.id ?? ''
}

export const getUsers = async (): Promise<User[] | null> => {
  const users = await db(UserDBName).select().table(UserDBName)
  return users
}

export const getUser = async (id: string): Promise<User | null> => {
  const user = await db(UserDBName).select().where({ id }).first()
  return user
}
