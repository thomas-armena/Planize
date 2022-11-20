import logger from '../lib/logging'
import { Todo, TodoProgress, TodoWithProgress } from '../types/todo'
import db from './configure'

const TodoDBName = 'todos'
const TodoProgressDBName = 'todoProgress'

export const insertTodo = async (todo: Todo): Promise<string> => {
  const [row] = await db(TodoDBName).insert(todo, ['id'])
  return row.id ?? ''
}

export const upsertTodo = async (todo: Todo): Promise<string> => {
  const [row] = await db(TodoDBName).insert(todo, ['id']).onConflict('id').merge()
  return row.id ?? ''
}

export const getTodos = async (): Promise<Todo[] | null> => {
  const todos = await db(TodoDBName).select().table(TodoDBName)
  return todos
}

export const deleteTodo = async (id: string): Promise<boolean> => {
  const deleted = await db(TodoDBName).delete().where({ id })
  return deleted > 0
}

export const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await db(TodoDBName).select().where({ id }).first()
  return todo
}

export const getTodoProgess = async (todoId: string): Promise<TodoProgress | null> => {
  const todoProgress = await db(TodoProgressDBName).select().where({ todoId }).first()
  return todoProgress
}

export const upsertTodoProgress = async (todoProgress: TodoProgress): Promise<string> => {
  const [row] = await db(TodoProgressDBName).insert(todoProgress, ['id']).onConflict('id').merge()
  return row.id ?? ''
}

export const getTodosWithProgress = async (userId): Promise<TodoWithProgress[] | null> => {
  const todos = await db(TodoDBName)
    .select(`${TodoDBName}.id`, 'creatorId', 'title', 'description', 'completed')
    .table(TodoDBName)
    .leftJoin(TodoProgressDBName, `${TodoDBName}.id`, `${TodoProgressDBName}.todoId`)
    .where({ creatorId: userId })
  logger.info(todos.map(t => JSON.stringify(t)))
  return todos.map((todo) => ({
    ...todo,
    completed: todo.completed ?? false
  }))
}

export const toggleTodo = async (todoId: string, userId: string): Promise<boolean> => {
  const todoProgress = await getTodoProgess(todoId)
  if (todoProgress != null) {
    const updatedTodoProgress = {
      ...todoProgress,
      completed: !todoProgress.completed
    }
    await upsertTodoProgress(updatedTodoProgress)
    return true
  } else {
    const newTodoProgress = {
      todoId,
      userId,
      completed: true
    }
    await upsertTodoProgress(newTodoProgress)
    return true
  }
}
