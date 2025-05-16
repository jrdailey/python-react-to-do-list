import { Task } from '../types'
import type { ChangeEvent } from 'react'
import TaskDescription from './TaskDescription'
import TaskCompletionStatus from './TaskCompletionStatus'
import TaskActions from './TaskActions'

interface TaskListItemProps {
  task: Task
  onTaskDelete: (task: Task) => void,
  onTaskSave: (task: Task) => void,
  onTaskUpdate: (task: Task) => void,
}

const TaskListItem = ({
  task,
  onTaskDelete,
  onTaskSave,
  onTaskUpdate,
}: TaskListItemProps) => {
  const toggleEditable = () => {
    onTaskUpdate({
      ...task,
      isEditable: !task.isEditable,
    })
  }

  const handleTaskSave = () => {
    onTaskSave({
      ...task,
      isEditable: false,
    })
  }
  const handleTaskDescriptionUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    onTaskUpdate({
      ...task,
      description: event.target.value,
    })
  }
  const handleTaskCompletion = () => {
    return onTaskUpdate({
      ...task,
      completedAt: task.completedAt ? undefined : new Date(),
    })
  }
  const handleTaskDelete = () => onTaskDelete(task)

  return (
    <li className="flex flex-wrap justify-evenly outline rounded-sm shadow-lg p-2 mb-2 md:justify-between lg:flex-nowrap">
      <span className="inline-flex flex-wrap content-center w-full md:w-1/2">
        <TaskDescription
          description={task.description}
          isEditable={task.isEditable}
          onUpdate={handleTaskDescriptionUpdate}
        />
      </span>
      <span className="inline-flex justify-end flex-wrap content-center text-left align-top py-2 pr-2 w-full md:w-1/2 lg:align-center lg:w-auto ">
        <TaskCompletionStatus
          completedAt={task.completedAt}
          isEditable={task.isEditable}
          onChange={handleTaskCompletion}
        />
      </span>
      <span className="inline-flex justify-end gap-2 w-full min-w-[160px] mt-1 lg:justify-between lg:w-[160px] lg:mt-0">
        <TaskActions
          isEditable={task.isEditable}
          onTaskDelete={handleTaskDelete}
          onTaskEdit={toggleEditable}
          onTaskSave={handleTaskSave}
        />
      </span>
    </li>
  )
}

export default TaskListItem
