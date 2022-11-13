import { gql } from 'apollo-server-express'

const rootSchema = gql`

  scalar JSON

  type GenericResponse {
    success: Boolean
    message: String
    data: JSON
  }
`

export default rootSchema
