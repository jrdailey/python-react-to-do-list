import { Task } from '../types'
import { useState } from 'react'
import type { ChangeEvent } from 'react'

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
    <li className="flex justify-between outline rounded-sm p-2 mb-2">
      <span className="w-1/2">
        {isEditable ?
          <input className="w-full outline p-0.5" type="text" value={task.description} onChange={handleTaskDescriptionUpdate} /> :
          <span>{task.description}</span>
        }
      </span>
      {isEditable ?
        <label><input type="checkbox" onChange={handleTaskCompletion} checked={!!task.completedAt} /> Complete</label> :
        task.completedAt && <span>Completed at {task.completedAt.toLocaleString()}</span>
      }
      <button type="button" onClick={() => isEditable ? handleTaskSave() : handleTaskEdit()}>{isEditable ? 'Save' : 'Edit'}</button>
    </li>
  )
}

export default TaskListItem
