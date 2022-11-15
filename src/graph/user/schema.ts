import { gql } from 'apollo-server-express'

const userSchema = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    birthDate: String
  }

  input UserInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    birthDate: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    loggedInUser: User
  }

  type Mutation {
    addUser(user: UserInput): GenericResponse
    updateUser(user: UserInput): GenericResponse
  }
`

export default userSchema
