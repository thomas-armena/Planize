import { gql } from 'apollo-server-express'

const manageSchema = gql`
  type Mutation {
    createUserTable: GenericResponse
    dropUserTable: GenericResponse
    createTodoTable: GenericResponse
    dropTodoTable: GenericResponse
    createTodoProgress: GenericResponse
    dropTodoProgress: GenericResponse
  }
`

export default manageSchema
