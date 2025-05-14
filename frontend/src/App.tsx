import { Task } from './types'
import TaskList from './components/TaskList'
import { useState } from 'react'

const initialTasks: Task[] = [
  {
    id: 0,
    description: 'Do the thing',
  },
  {
    id: 1,
    description: 'Do the other thing',
  },
]

function App() {
  const sortTasks = (tasks: Task[]) => {
    // Returns a new, sorted task list
    return [...tasks].sort((a, b) => {
      // Keep incomplete tasks at the top, sort completed items by date descending
      if (!a.completedAt && !b.completedAt) return 0
      if (!a.completedAt) return -1
      if (!b.completedAt) return 1

      return b.completedAt.getTime() - a.completedAt.getTime()
    })
  }
  const [tasks, setTasks] = useState(sortTasks(initialTasks))

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask
      } else {
        return task
      }
    }))
  }
  const handleTaskSave = (task: Task) => {
    // ToDo: Make API call
    setTasks(sortTasks(tasks))
  }

  return (
    <>
      <h1 className="text-2xl text-center">Task List</h1>
      <hr className="mb-2" />
      <div className="flex justify-center">
        <TaskList
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskSave={handleTaskSave}
        />
      </div>
    </>
  )
}

export default App
