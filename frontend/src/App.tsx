import { Task, UnpersistedTask } from './types'
import TaskList from './components/TaskList'
import { useEffect, useState } from 'react'
import { createTaskApi } from './utils'

function App() {
  const [tasks, setTasks] = useState([] as Task[])
  const [editableTasks, setEditableTasks] = useState<Record<number, boolean>>({})

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
  const isTaskEditable = (task: Task) => !!editableTasks[task.id]
  const setTaskEditability = (task: Task, isEditable: boolean) => {
    setEditableTasks({
      ...editableTasks,
      [task.id]: isEditable,
    })
  }

  const handleTaskAdd = async () => {
    const newTask: UnpersistedTask = { description: '' }
    const updatedTasks = sortTasks(await api.createTask(newTask))

    // Set new task as editable
    setTaskEditability(updatedTasks[0], true)

    setTasks(updatedTasks)
  }
  const handleTaskEdit = (task: Task) => setTaskEditability(task, true)
  const handleTaskUpdate = (updatedTask: Task) => {
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

    setTaskEditability(task, false)
    setTasks(sortTasks(updatedTasks))
  }
  const handleTaskDelete = async (task: Task) => {
    const updatedTasks = await api.deleteTask(task)

    setTasks(sortTasks(updatedTasks))
  }
  const handleTaskCompletion = (task: Task) => {
    const updatedTask = {
      ...task,
      completedAt: task.completedAt ? undefined : new Date(),
    }

    if (isTaskEditable(task)) {
      handleTaskUpdate(updatedTask)
    } else {
      // Immediately save update when the task is not in an edit state
      handleTaskSave(updatedTask)
    }
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
        isTaskEditable={isTaskEditable}
        onTaskAdd={handleTaskAdd}
        onTaskCompletion={handleTaskCompletion}
        onTaskUpdate={handleTaskUpdate}
        onTaskEdit={handleTaskEdit}
        onTaskSave={handleTaskSave}
        onTaskDelete={handleTaskDelete}
      />
    </>
  )
}

export default App
