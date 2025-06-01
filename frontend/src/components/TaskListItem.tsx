import { Task } from '../types'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import TextField from './TextField'
import TaskCompletionStatus from './TaskCompletionStatus'
import StandardButton from './StandardButton'

interface TaskListItemProps {
  task: Task
  isEditable: boolean,
  onTaskDelete: (task: Task) => void,
  onTaskEdit: (task: Task) => void,
  onTaskSave: (task: Task) => void,
}

const TaskListItem = ({
  task,
  isEditable,
  onTaskDelete,
  onTaskEdit,
  onTaskSave,
}: TaskListItemProps) => {
  const [localTask, setLocalTask] = useState(task)

  useEffect(() => setLocalTask(task), [task])

  const handleTaskEdit = () => onTaskEdit(task)
  const handleTaskSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onTaskSave(localTask)
  }
  const handleTaskTitleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTask({
      ...localTask,
      title: event.target.value,
    })
  }
  const handleTaskDescriptionUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTask({
      ...localTask,
      description: event.target.value,
    })
  }
  const toggleTaskCompletion = () => {
    const updatedTask = {
      ...localTask,
      completedAt: localTask.completedAt ? undefined : new Date(),
    }

    if (isEditable) {
      setLocalTask(updatedTask)
    } else {
      // Immediately save changes when not in edit mode
      onTaskSave(updatedTask)
    }
  }
  const handleTaskDelete = () => onTaskDelete(task)

  return (
    <li>
      <form
        className={`flex flex-wrap justify-evenly outline rounded-sm shadow-lg p-2 mb-2 md:justify-between lg:flex-nowrap ${task.completedAt && !isEditable && 'bg-slate-200'}`}
        onSubmit={handleTaskSave}
      >
        <div className="flex flex-col flex-wrap gap-1 w-full md:w-1/2">
          <div className={!isEditable ? 'font-bold' : ''}>
            <TextField
              label="Title"
              value={localTask.title}
              inputName="task-title"
              isEditable={isEditable}
              autoFocus={true}
              required={true}
              onUpdate={handleTaskTitleUpdate}
            />
          </div>
          {(isEditable || localTask.description) &&
            <div className={!isEditable ? 'pl-4 italic' : ''}>
              <TextField
                label="Description"
                value={localTask.description}
                inputName="task-description"
                isEditable={isEditable}
                onUpdate={handleTaskDescriptionUpdate}
              />
            </div>
          }
          <span className="font-light">Created at {new Date(localTask.createdAt).toLocaleString()}</span>
        </div>
        <span className="inline-flex justify-start flex-wrap content-start text-left align-top py-2 w-full md:w-1/2 md:justify-end md:content-center md:text-right lg:align-center lg:w-1/4">
          <TaskCompletionStatus
            completedAt={localTask.completedAt}
            isEditable={isEditable}
            onChange={toggleTaskCompletion}
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
