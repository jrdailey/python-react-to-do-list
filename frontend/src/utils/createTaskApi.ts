import { Task, UnpersistedTask } from '../types'

const parseResponse = async (response: Response): Promise<Task[]> => {
  const tasks = (await response.json()).tasks

  const parsedTasks = tasks.map((task: Task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
  })) as Task[]

  return Promise.resolve(parsedTasks)
}

export const createTaskApi = (apiHost: string, apiPort: string) => {
  const apiUrl = `${apiHost}:${apiPort}/api`

  const getTasks = async () => {
    const response = await fetch(`${apiUrl}/tasks`)

    return parseResponse(response)
  }

  const createTask = async (task: UnpersistedTask) => {
    const response = await fetch(
      `${apiUrl}/tasks`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      },
    )

    return parseResponse(response)
  }

  const updateTask = async (task: Task) => {
    const response = await fetch(
      `${apiUrl}/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      },
    )

    return parseResponse(response)
  }

  const deleteTask = async (task: Task) => {
    const response = await fetch(`${apiUrl}/tasks/${task.id}`, { method: 'DELETE' })

    return parseResponse(response)
  }

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
