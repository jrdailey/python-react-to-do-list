import { Task, UnpersistedTask } from './types'
import TaskList from './components/TaskList'
import { useEffect, useState } from 'react'
import { createTaskApi } from './utils'

function App() {
  const [tasks, setTasks] = useState([] as Task[])

  const api = createTaskApi('http://localhost', '4000')

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
  const handleTaskAdd = async () => {
    const newTask: UnpersistedTask = { description: '' }
    const updatedTasks = await api.createTask(newTask)

    setTasks(sortTasks(updatedTasks))
  }
  const handleTaskEdit = (updatedTask: Task) => {
    setTasks(tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask
      } else {
        return task
      }
    }))
  }
  const handleTaskSave = async (task: Task) => {
    const updatedTasks = await api.updateTask(task)

    setTasks(sortTasks(updatedTasks))
  }
  const handleTaskDelete = async (task: Task) => {
    const updatedTasks = await api.deleteTask(task)

    setTasks(sortTasks(updatedTasks))
  }

  useEffect(() => {
    const initializeTasks = async () => {
      const tasks = await api.getTasks()

      setTasks(sortTasks(tasks))
    }

    initializeTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally run once on load
  }, [])

  return (
    <>
      <h1 className="text-4xl p-2">Tasks</h1>
      <hr className="mb-2" />
      <TaskList
        tasks={tasks}
        onTaskAdd={handleTaskAdd}
        onTaskUpdate={handleTaskEdit}
        onTaskSave={handleTaskSave}
        onTaskDelete={handleTaskDelete}
      />
    </>
  )
}

export default App
