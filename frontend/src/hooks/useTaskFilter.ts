import { useMemo, useState } from 'react'
import { FilterOption, FilterSetting, Task } from '../types'

const allFilter = {
  label: 'All',
  value: 'all',
}

const completedFilter = {
  label: 'Completed',
  value: 'completed',
}

const incompletFilter = {
  label: 'Incomplete',
  value: 'incomplete',
}

const filterOptions: FilterOption[] = [allFilter, completedFilter, incompletFilter]

const defaultFilterSetting: FilterSetting = {
  filterText: '',
  selectedOption: allFilter,
}

export const useTaskFilter = (tasks: Task[]) => {
  const [taskFilter, setTaskFilter] = useState(defaultFilterSetting)

  const filteredTasks = useMemo(() => {
    const includesFilterText = (task: Task) => {
      const { filterText } = taskFilter
      if (!filterText) return true

      const lowerCaseText = filterText.toLowerCase()

      return task.title.toLowerCase().includes(lowerCaseText) ||
        task.description.toLowerCase().includes(lowerCaseText)
    }
    const meetsFilterOption = (task: Task) => {
      switch (taskFilter.selectedOption.value) {
        case completedFilter.value: return !!task.completedAt
        case incompletFilter.value: return !task.completedAt
        default: return true
      }
    }

    return tasks.filter(task => includesFilterText(task) && meetsFilterOption(task))
  }, [taskFilter, tasks])

  return {
    defaultFilterSetting,
    filteredTasks,
    filterOptions,
    setTaskFilter,
  }
}
