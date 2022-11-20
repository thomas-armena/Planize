import { gql } from 'apollo-server-express'

const todoSchema = gql`
  type Mutation {
    createTodo(todo: TodoInput): GenericResponse
    upsertTodo(todo: TodoInput): GenericResponse
    deleteTodo(id: Int!): GenericResponse
    toggleTodo(id: Int!): GenericResponse
  }

  type Query {
    todos: [Todo]
  }

  type Todo {
    id: Int!
    creatorId: ID!
    title: String!
    description: String!
    completed: Boolean!
  }

  input TodoInput {
    id: Int
    title: String
    description: String
  }
`

export default todoSchema
