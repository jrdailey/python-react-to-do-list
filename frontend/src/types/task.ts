export interface Task {
  id: number,
  completedAt?: Date,
  createdAt: Date,
  title: string,
  description: string,
}

export type UnpersistedTask = Omit<Task, 'id'>
