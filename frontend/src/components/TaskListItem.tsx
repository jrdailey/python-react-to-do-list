import { Task } from '../types'
import type { ChangeEvent, FormEvent } from 'react'
import TaskDescription from './TaskDescription'
import TaskCompletionStatus from './TaskCompletionStatus'
import StandardButton from './StandardButton'

interface TaskListItemProps {
  task: Task
  isEditable: boolean,
  onTaskCompletion: (task: Task) => void,
  onTaskDelete: (task: Task) => void,
  onTaskEdit: (task: Task) => void,
  onTaskSave: (task: Task) => void,
  onTaskUpdate: (task: Task) => void,
}

const TaskListItem = ({
  task,
  isEditable,
  onTaskCompletion,
  onTaskDelete,
  onTaskEdit,
  onTaskSave,
  onTaskUpdate,
}: TaskListItemProps) => {
  const handleTaskEdit = () => onTaskEdit(task)
  const handleTaskSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onTaskSave(task)
  }
  const handleTaskDescriptionUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    onTaskUpdate({
      ...task,
      description: event.target.value,
    })
  }
  const handleTaskCompletion = () => onTaskCompletion(task)
  const handleTaskDelete = () => onTaskDelete(task)

  return (
    <li>
      <form
        className="flex flex-wrap justify-evenly outline rounded-sm shadow-lg p-2 mb-2 md:justify-between lg:flex-nowrap"
        onSubmit={handleTaskSave}
      >
        <span className="inline-flex flex-wrap content-center w-full md:w-1/2">
          <TaskDescription
            description={task.description}
            isEditable={isEditable}
            onUpdate={handleTaskDescriptionUpdate}
          />
        </span>
        <span className="inline-flex justify-end flex-wrap content-center text-right align-top py-2 pr-2 w-full md:w-1/2 lg:align-center lg:w-1/4">
          <TaskCompletionStatus
            completedAt={task.completedAt}
            isEditable={isEditable}
            onChange={handleTaskCompletion}
          />
        </span>
        <span className="inline-flex justify-end gap-2 w-full min-w-[160px] items-center mt-1 lg:justify-between lg:w-[160px] lg:mt-0">
          {isEditable &&
            <StandardButton type="submit" text="Save" color="green" />
          }
          {!isEditable &&
            <StandardButton text="Edit" color="gray" onClick={handleTaskEdit} />
          }
          <StandardButton text="Delete" color="red" onClick={handleTaskDelete} />
        </span>
      </form>
    </li>
  )
}

export default TaskListItem
