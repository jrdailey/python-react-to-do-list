import { Task } from '../types'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import StandardButton from './StandardButton'

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
        {/* Description */}
        {isEditable ?
          <input
            className="w-full outline rounded-sm p-1"
            type="text"
            value={task.description}
            autoFocus={true}
            onChange={handleTaskDescriptionUpdate}
          /> :
          <span
            className="w-full h-full p-0.5 break-normal lg:h-auto">
            {task.description}
          </span>
        }
      </span>
      <span className="inline-flex justify-end flex-wrap content-center text-right align-top px-2 w-1/2 lg:align-center lg:text-left lg:w-auto ">
        {/* Completion status */}
        {isEditable ?
          <label>
            <input type="checkbox" onChange={handleTaskCompletion} checked={!!task.completedAt} />
            &nbsp;Complete
          </label> :
          task.completedAt && <span className="h-full lg:h-auto">Completed at {task.completedAt.toLocaleString()}</span>
        }
      </span>
      <span className="inline-flex justify-end gap-2 w-full min-w-[160px] mt-1 lg:justify-between lg:w-[160px] lg:mt-0">
        {/* Save/Edit/Delete buttons */}
        {isEditable ?
          <StandardButton
            text="Save"
            color="green"
            onClick={handleTaskSave}
          /> :
          <StandardButton
            text="Edit"
            color="gray"
            onClick={handleTaskEdit}
          />
        }
        <StandardButton
          text='Delete'
          color='red'
          onClick={handleTaskDelete}
        />
      </span>
    </li>
  )
}

export default TaskListItem
