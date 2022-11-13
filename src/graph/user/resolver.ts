import User from '../../types/user'
import { now } from '../../lib/time'

const userResolvers = {
  Query: {
    users: (): User[] => {
      return [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          birthDate: now()
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@gmail.com',
          birthDate: now()
        }
      ]
    }
  }
}

export default userResolvers
