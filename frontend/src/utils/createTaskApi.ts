import { Task, UnpersistedTask } from '../types'

export const createTaskApi = (host: string, port: string) => {
  const apiAddress = `${host}:${port}/api`

  const getTasks = async () => {
    const response = await fetch(`${apiAddress}/tasks`)
    const tasks = await response.json() as Task[]

    return tasks
  }

  const createTask = async (task: UnpersistedTask) => {
    const response = await fetch(
      `${apiAddress}/tasks`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      },
    )
    const tasks = await response.json() as Task[]

    return tasks
  }

  const updateTask = async (task: Task) => {
    const response = await fetch(
      `${apiAddress}/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      },
    )
    const tasks = await response.json() as Task[]

    return tasks
  }

  const deleteTask = async (task: Task) => {
    const response = await fetch(`${apiAddress}/tasks/${task.id}`, { method: 'DELETE' })
    const tasks = await response.json() as Task[]

    return tasks
  }

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
