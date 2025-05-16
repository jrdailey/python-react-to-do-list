import { Task, UnpersistedTask } from '../types'

const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT


export const createTaskApi = () => {
  const apiUrl = `${apiHost}:${apiPort}/api`

  const getTasks = async () => {
    const response = await fetch(`${apiUrl}/tasks`)
    const tasks = await response.json() as Task[]

    return tasks
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
    const tasks = await response.json() as Task[]

    return tasks
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
    const tasks = await response.json() as Task[]

    return tasks
  }

  const deleteTask = async (task: Task) => {
    const response = await fetch(`${apiUrl}/tasks/${task.id}`, { method: 'DELETE' })
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
