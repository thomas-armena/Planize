import { deleteTodo, getTodosWithProgress, insertTodo, toggleTodo, upsertTodo } from '../../db/todo'
import logger from '../../lib/logging'
import { GenericResponse } from '../../types/api'
import { Todo, TodoWithProgress } from '../../types/todo'

const todoResolvers = {
  Mutation: {
    createTodo: async (_, { todo }: { todo: Todo }, { userId }: { userId: string }): Promise<GenericResponse> => {
      const id = await insertTodo({
        ...todo,
        creatorId: userId
      })
      return {
        success: true,
        message: `Todo ${id} added`,
        data: { id }
      }
    },
    upsertTodo: async (_, { todo }: { todo: Todo }, { userId }): Promise<GenericResponse> => {
      logger.info(`Upserting todo for user ${userId}`)
      const id = await upsertTodo({
        ...todo,
        creatorId: userId
      })
      return {
        success: true,
        message: `Todo ${id} updated`,
        data: { id }
      }
    },
    deleteTodo: async (_, { id }: { id: string }): Promise<GenericResponse> => {
      await deleteTodo(id)
      return {
        success: true,
        message: `Todo ${id} deleted`,
        data: { id }
      }
    },
    toggleTodo: async (_, { id }: { id: string }, { userId }: { userId: string }): Promise<GenericResponse> => {
      await toggleTodo(id, userId)
      return {
        success: true,
        message: `Todo ${id} toggled`,
        data: { id }
      }
    }
  },
  Query: {
    todos: async (_, __, { userId }: { userId: string }): Promise<TodoWithProgress[]> => {
      const todos = await getTodosWithProgress(userId)
      if (todos == null) {
        return []
      }
      return todos
    }
  }
}

export default todoResolvers
