import { FilterSetting } from './types'
import ErrorDisplay from './components/ErrorDisplay'
import TaskList from './components/TaskList'
import { useCallback } from 'react'
import FilterControls from './components/FilterControls'
import { useTaskFilter, useTasks } from './hooks'

function App() {
  const {
    tasks,
    taskErrorMessage,
    isLoading,
    isTaskEditable,
    handleTaskAdd,
    handleTaskEdit,
    handleTaskSave,
    handleTaskDelete,
  } = useTasks()

  const {
    defaultFilterSetting,
    filteredTasks,
    filterOptions,
    setTaskFilter,
  } = useTaskFilter(tasks)

  const onFilterChange = useCallback((setting: FilterSetting) => setTaskFilter(setting), [setTaskFilter])

  return (
    <>
      <header className="mb-2">
        <h1 className="text-4xl p-2">Tasks</h1>
        <hr />
      </header>
      <main className="flex justify-center">
        <div className="w-2/3 min-w-[250px]">
          {taskErrorMessage && <ErrorDisplay errorMessage={taskErrorMessage} />}
          <FilterControls
            defaultSetting={defaultFilterSetting}
            options={filterOptions}
            onChange={onFilterChange}
          />
          <div className="pt-4">
            {isLoading ? 'Loading...' :
              <TaskList
                tasks={filteredTasks}
                isTaskEditable={isTaskEditable}
                onTaskAdd={handleTaskAdd}
                onTaskEdit={handleTaskEdit}
                onTaskSave={handleTaskSave}
                onTaskDelete={handleTaskDelete}
              />
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
