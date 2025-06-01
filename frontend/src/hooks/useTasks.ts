import { useEffect, useState } from 'react'
import { Task, UnpersistedTask } from '../types'
import { createTaskApi } from '../utils'

const apiHost = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT
const api = createTaskApi(apiHost, apiPort)

const sortTasks = (tasks: Task[]) => {
  // Returns a new, sorted task list
  return [...tasks].sort((a, b) => {
    // Keep incomplete tasks at the top, sort completed items by date descending
    if (!a.completedAt && !b.completedAt) return 0
    if (!a.completedAt) return -1
    if (!b.completedAt) return 1

    return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  })
}

export const useTasks = () => {
  const [tasks, setTasks] = useState([] as Task[])
  const [taskErrorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [editableTasks, setEditableTasks] = useState<Record<number, boolean>>({})
  const isTaskEditable = (task: Task) => !!editableTasks[task.id]
  const setTaskEditability = (task: Task, isEditable: boolean) => {
    setEditableTasks((prev) => ({
      ...prev,
      [task.id]: isEditable,
    }))
  }

  const handleTaskAdd = async () => {
    setErrorMessage('')

    try {
      const newTask: UnpersistedTask = {
        title: '',
        description: '',
        createdAt: new Date(),
      }
      const updatedTasks = sortTasks(await api.createTask(newTask))

      // Set new task as editable
      setTaskEditability(updatedTasks[0], true)

      setTasks(updatedTasks)
    } catch {
      setErrorMessage('An error occurred while trying to create a new task. Try again.')
    }
  }

  const handleTaskEdit = (task: Task) => setTaskEditability(task, true)

  const handleTaskSave = async (task: Task) => {
    setErrorMessage('')

    try {
      const updatedTasks = await api.updateTask(task)

      setTaskEditability(task, false)
      setTasks(sortTasks(updatedTasks))
    } catch {
      setErrorMessage('An error occurred while saving the task. Try again.')
    }
  }

  const handleTaskDelete = async (task: Task) => {
    setErrorMessage('')

    try {
      const updatedTasks = await api.deleteTask(task)

      setTasks(sortTasks(updatedTasks))
    } catch {
      setErrorMessage('An error occurred while deleting the task. Try again.')
    }
  }

  useEffect(() => {
    const initializeTasks = async () => {
      setIsLoading(true)

      try {
        const tasks = await api.getTasks()

        setTasks(sortTasks(tasks))
      } catch {
        setErrorMessage('An error occurred while retrieving tasks. Try again.')
      } finally {
        setIsLoading(false)
      }
    }

    initializeTasks()

  }, [])

  return {
    tasks,
    taskErrorMessage,
    isLoading,
    isTaskEditable,
    handleTaskAdd,
    handleTaskEdit,
    handleTaskSave,
    handleTaskDelete,
  }
}
