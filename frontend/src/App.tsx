import { FilterSetting, Task, UnpersistedTask } from './types'
import ErrorDisplay from './components/ErrorDisplay'
import TaskList from './components/TaskList'
import { useCallback, useEffect, useState } from 'react'
import { createTaskApi } from './utils'
import FilterControls from './components/FilterControls'
import { useTaskFilter } from './hooks'

function App() {
  const [tasks, setTasks] = useState([] as Task[])
  const [editableTasks, setEditableTasks] = useState<Record<number, boolean>>({})
  const [errorMessage, setErrorMessage] = useState('')

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
  const isTaskEditable = (task: Task) => !!editableTasks[task.id]
  const setTaskEditability = (task: Task, isEditable: boolean) => {
    setEditableTasks({
      ...editableTasks,
      [task.id]: isEditable,
    })
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
      try {
        const tasks = await api.getTasks()

        setTasks(sortTasks(tasks))
      } catch {
        setErrorMessage('An error occurred while retrieving tasks. Try again.')
      }
    }

    initializeTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally run once on load
  }, [])

  const {
    defaultFilterSetting,
    filteredTasks,
    filterOptions,
    setTaskFilter,
  } = useTaskFilter(tasks)

  const onFilterChange = useCallback((setting: FilterSetting) => setTaskFilter(setting), [setTaskFilter])

  return (
    <>
      <h1 className="text-4xl p-2">Tasks</h1>
      <hr className="mb-2" />
      <div className="flex justify-center">
        <div className="w-2/3 min-w-[250px]">
          {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
          <FilterControls
            defaultSetting={defaultFilterSetting}
            options={filterOptions}
            onChange={onFilterChange}
          />
          <div className="pt-4">
            <TaskList
              tasks={filteredTasks}
              isTaskEditable={isTaskEditable}
              onTaskAdd={handleTaskAdd}
              onTaskCompletion={handleTaskCompletion}
              onTaskUpdate={handleTaskUpdate}
              onTaskEdit={handleTaskEdit}
              onTaskSave={handleTaskSave}
              onTaskDelete={handleTaskDelete}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
