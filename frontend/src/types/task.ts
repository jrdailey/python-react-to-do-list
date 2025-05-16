export interface Task {
  id: number,
  completedAt?: Date,
  description: string,
}

export type UnpersistedTask = Omit<Task, 'id'>
