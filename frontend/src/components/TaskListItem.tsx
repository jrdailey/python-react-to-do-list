import { Task } from '../types'
import { useState } from 'react'
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
  const [isEditable, setIsEditable] = useState(false)
  const handleTaskEdit = () => setIsEditable(true)
  const handleTaskSave = () => {
    onTaskSave(task)
    setIsEditable(false)
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
      <span className="inline-flex flex-wrap content-center w-1/2">
        <TaskDescription
          description={task.description}
          isEditable={isEditable}
          onUpdate={handleTaskDescriptionUpdate}
        />
      </span>
      <span className="inline-flex justify-end flex-wrap content-center text-right align-top px-2 w-1/2 lg:align-center lg:text-left lg:w-auto ">
        <TaskCompletionStatus
          completedAt={task.completedAt}
          isEditable={isEditable}
          onChange={handleTaskCompletion}
        />
      </span>
      <span className="inline-flex justify-end gap-2 w-full min-w-[160px] mt-1 lg:justify-between lg:w-[160px] lg:mt-0">
        <TaskActions
          isEditable={isEditable}
          onTaskDelete={handleTaskDelete}
          onTaskEdit={handleTaskEdit}
          onTaskSave={handleTaskSave}
        />
      </span>
    </li>
  )
}

export default TaskListItem
