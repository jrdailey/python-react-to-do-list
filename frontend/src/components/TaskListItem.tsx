import { Task } from '../types'
import type { ChangeEvent, FormEvent } from 'react'
import TextField from './TextField'
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
  const handleTaskTitleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    onTaskUpdate({
      ...task,
      title: event.target.value,
    })
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
        className={`flex flex-wrap justify-evenly outline rounded-sm shadow-lg p-2 mb-2 md:justify-between lg:flex-nowrap ${task.completedAt && !isEditable && 'bg-slate-200'}`}
        onSubmit={handleTaskSave}
      >
        <div className="flex flex-col flex-wrap gap-1 w-full md:w-1/2">
          <div className={!isEditable ? 'font-bold' : ''}>
            <TextField
              label="Title"
              value={task.title}
              inputName="task-title"
              isEditable={isEditable}
              autoFocus={true}
              required={true}
              onUpdate={handleTaskTitleUpdate}
            />
          </div>
          {(isEditable || task.description) &&
            <div className={!isEditable ? 'indent-4 italic' : ''}>
              <TextField
                label="Description"
                value={task.description}
                inputName="task-description"
                isEditable={isEditable}
                onUpdate={handleTaskDescriptionUpdate}
              />
            </div>
          }
          <span className="font-light">Created at {new Date(task.createdAt).toLocaleString()}</span>
        </div>
        <span className="inline-flex justify-start flex-wrap content-start text-left align-top py-2 w-full md:w-1/2 md:justify-end md:content-center md:text-right lg:align-center lg:w-1/4">
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
