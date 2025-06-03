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

const incompleteFilter = {
  label: 'Incomplete',
  value: 'incomplete',
}

const filterOptions: FilterOption[] = [allFilter, completedFilter, incompleteFilter]

const defaultFilterSetting: FilterSetting = {
  filterText: '',
  selectedOption: allFilter,
}

export const useTaskFilter = (tasks: Task[], isEditable: (task: Task) => boolean) => {
  const [taskFilter, setTaskFilter] = useState(defaultFilterSetting)

  const filteredTasks = useMemo(() => {
    const includesFilterText = (task: Task) => {
      const { filterText } = taskFilter
      if (!filterText) return true

      const lowerCaseText = filterText.toLowerCase()

      return task.title.toLowerCase().includes(lowerCaseText) ||
        task.description?.toLowerCase().includes(lowerCaseText)
    }
    const meetsFilterOption = (task: Task) => {
      switch (taskFilter.selectedOption.value) {
        case completedFilter.value: return !!task.completedAt
        case incompleteFilter.value: return !task.completedAt
        default: return true
      }
    }

    // Any task that is being edited should remain in the filtered list, otherwise apply filter
    return tasks.filter(task => isEditable(task) || (includesFilterText(task) && meetsFilterOption(task)))
  }, [isEditable, taskFilter, tasks])

  return {
    defaultFilterSetting,
    filteredTasks,
    filterOptions,
    setTaskFilter,
  }
}
