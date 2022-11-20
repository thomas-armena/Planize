
export interface Todo {
  id?: string
  creatorId: string
  title: string
  description: string
}

export interface TodoProgress {
  id?: string
  todoId: string
  userId: string
  completed: boolean
}

export interface TodoWithProgress extends Todo {
  completed: boolean
}
