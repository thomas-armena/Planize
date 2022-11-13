import { gql } from 'apollo-server-express'

const userSchema = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    birthDate: String
  }

  type Query {
    users: [User]
  }
`

export default userSchema
