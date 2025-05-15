import { Task } from '../types'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import StandardButton from './StandardButton'

interface TaskListItemProps {
  task: Task
  onTaskUpdate: (task: Task) => void,
  onTaskSave: (task: Task) => void,
}

const TaskListItem = ({
  task,
  onTaskUpdate,
  onTaskSave,
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

  return (
    <li className="flex justify-between outline rounded-sm shadow-lg p-2 mb-2">
      <span className="inline-flex flex-wrap content-center w-1/2">
        {isEditable ?
          <input className="w-full outline p-0.5" type="text" value={task.description} onChange={handleTaskDescriptionUpdate} /> :
          <span className="w-full p-0.5">{task.description}</span>
        }
      </span>
      {isEditable ?
        <label><input type="checkbox" onChange={handleTaskCompletion} checked={!!task.completedAt} /> Complete</label> :
        task.completedAt && <span>Completed at {task.completedAt.toLocaleString()}</span>
      }
      <StandardButton
        text={isEditable ? 'Save' : 'Edit'}
        color={isEditable ? 'green' : 'gray'}
        onClick={() => isEditable ? handleTaskSave() : handleTaskEdit()}
      />
    </li>
  )
}

export default TaskListItem
