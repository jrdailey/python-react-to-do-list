import { Task } from '../types'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import StandardButton from './StandardButton'

interface TaskListItemProps {
  task: Task
  onTaskUpdate: (task: Task) => void,
  onTaskSave: (task: Task) => void,
  onTaskDelete: (task: Task) => void,
}

const TaskListItem = ({
  task,
  onTaskUpdate,
  onTaskSave,
  onTaskDelete,
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
    <li className="flex flex-wrap justify-between outline rounded-sm shadow-lg p-2 mb-2 lg:flex-nowrap">
      <span className="inline-flex flex-wrap content-center w-1/2">
        {isEditable ?
          <input className="w-full outline rounded-sm p-1" type="text" value={task.description} onChange={handleTaskDescriptionUpdate} /> :
          <span className="w-full p-0.5">{task.description}</span>
        }
      </span>
      <span className="inline-flex justify-end flex-wrap content-center px-2 w-1/2 lg:w-auto ">
        {isEditable ?
          <label><input type="checkbox" onChange={handleTaskCompletion} checked={!!task.completedAt} /> Complete</label> :
          task.completedAt && <span>Completed at {task.completedAt.toLocaleString()}</span>
        }
      </span>
      <span className="inline-flex justify-end gap-2 w-full min-w-[160px] mt-1 lg:justify-between lg:w-[160px] lg:mt-0">
        <StandardButton
          text={isEditable ? 'Save' : 'Edit'}
          color={isEditable ? 'green' : 'gray'}
          onClick={() => isEditable ? handleTaskSave() : handleTaskEdit()}
        />
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
