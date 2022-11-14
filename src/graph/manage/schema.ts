import { gql } from 'apollo-server-express'

const manageSchema = gql`
  type Mutation {
    createUserTable: GenericResponse
    dropUserTable: GenericResponse
  }
`

export default manageSchema
